import { NextRequest, NextResponse } from 'next/server';
import crypto from 'node:crypto';
import { execSync } from 'node:child_process';

// 从环境变量获取GitHub Webhook密钥
const GITHUB_SECRET = process.env.GITHUB_WEBHOOK_SECRET || '';
// 项目根目录路径
const PROJECT_PATH = process.cwd();

// 简化的日志函数，只输出到控制台
function log(...args: any[]) {
  console.log(`[${new Date().toISOString()}] ${args.join(' ')}`);
}

/**
 * 验证GitHub Webhook签名
 */
function verifySignature(payload: string, signature: string): boolean {
  if (!GITHUB_SECRET) return true;
  
  const hmac = crypto.createHmac('sha256', GITHUB_SECRET);
  hmac.update(payload);
  const expectedSignature = `sha256=${hmac.digest('hex')}`;
  
  return signature === expectedSignature;
}

/**
 * 简化的命令执行函数，只返回执行结果
 */
function executeCommand(cmd: string, timeout: number = 5000): string {
  return execSync(cmd, { encoding: 'utf-8', timeout });
}

/**
 * 执行git pull的API端点
 */
export async function POST(request: NextRequest) {
  try {
    // 1. 验证GitHub签名
    const signature = request.headers.get('x-hub-signature-256') || '';
    const payload = await request.text();
    
    if (!verifySignature(payload, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }
    
    // 2. 设置Git安全目录（只执行一次，后续自动生效）
    try {
      executeCommand(`git config --global --add safe.directory "${PROJECT_PATH}"`, 5000);
    } catch (e) {
      // 忽略重复添加的错误
    }
    
    // 3. 检查并处理本地修改
    try {
      const status = executeCommand(`git -C "${PROJECT_PATH}" status --porcelain`, 5000);
      
      if (status.trim() !== '') {
        // 有未提交的修改，先保存
        executeCommand(`git -C "${PROJECT_PATH}" stash push -m "Webhook auto stash"`, 5000);
      }
      
      // 4. 执行git pull
      const gitPull = executeCommand(`git -C "${PROJECT_PATH}" pull --force`, 10000);
      
      return NextResponse.json({
        success: true,
        message: 'git pull executed successfully',
        result: gitPull,
        timestamp: new Date().toISOString()
      });
    } catch (pullError: any) {
      // 智能错误处理
      if (pullError.message.includes('Your local changes to the following files would be overwritten by merge')) {
        return NextResponse.json({
          success: false,
          message: 'git pull failed due to local changes conflict',
          error: pullError.message,
          suggestedSolution: `请手动执行以下命令解决冲突：\n1. git -C ${PROJECT_PATH} status\n2. git -C ${PROJECT_PATH} stash push -m "manual stash"\n3. git -C ${PROJECT_PATH} pull\n4. git -C ${PROJECT_PATH} stash pop\n5. 解决冲突并提交`
        }, { status: 500 });
      } else if (pullError.message.includes('Permission denied')) {
        return NextResponse.json({
          success: false,
          message: 'git pull failed due to permission error',
          error: pullError.message,
          suggestedSolution: `请手动执行以下命令解决权限问题：\n1. sudo chown -R www:www ${PROJECT_PATH}/.git\n2. sudo chmod -R 775 ${PROJECT_PATH}/.git`
        }, { status: 500 });
      } else {
        return NextResponse.json({
          success: false,
          message: 'git pull failed',
          error: pullError.message
        }, { status: 500 });
      }
    }
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'webhook handler failed',
      error: error.message
    }, { status: 500 });
  }
}

/**
 * 健康检查端点
 */
export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: true,
    message: 'Webhook endpoint is running',
    timestamp: new Date().toISOString(),
    status: 'healthy'
  });
}