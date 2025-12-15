'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { DownloadIcon } from 'lucide-react'

export function PwaInstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const deferredPrompt = useRef<any>(null)

  useEffect(() => {
    // 检查是否已经安装
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    const isFullscreen = document.fullscreenElement !== null
    const isIosStandalone = window.navigator.standalone === true
    
    if (isStandalone || isFullscreen || isIosStandalone) {
      setIsInstalled(true)
      return
    }

    // 监听beforeinstallprompt事件
    const handleBeforeInstallPrompt = (e: Event) => {
      // 阻止浏览器默认的安装提示
      e.preventDefault()
      // 保存事件对象，以便稍后触发安装
      deferredPrompt.current = e as any
      // 显示自定义安装提示
      setShowPrompt(true)
    }

    // 监听appinstalled事件，当应用被安装后隐藏提示
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setShowPrompt(false)
      deferredPrompt.current = null
    }

    // 监听display-mode变化，检查是否从安装状态切换
    const handleDisplayModeChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsInstalled(true)
        setShowPrompt(false)
      }
    }

    // 添加事件监听器
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)
    window.matchMedia('(display-mode: standalone)').addEventListener('change', handleDisplayModeChange)

    // 清理事件监听器
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
      window.matchMedia('(display-mode: standalone)').removeEventListener('change', handleDisplayModeChange)
    }
  }, [])

  // 处理安装按钮点击
  const handleInstallClick = async () => {
    if (!deferredPrompt.current) return

    try {
      // 显示浏览器的安装提示
      const result = await deferredPrompt.current.prompt()
      console.log('用户选择:', result.outcome)
      
      // 等待用户做出选择
      if (result.outcome === 'accepted') {
        setIsInstalled(true)
        setShowPrompt(false)
      }
      
      // 重置deferredPrompt
      deferredPrompt.current = null
    } catch (error) {
      console.error('安装提示失败:', error)
    }
  }

  // 处理关闭按钮点击
  const handleCloseClick = () => {
    setShowPrompt(false)
  }

  // 如果已经安装或不显示提示，则不渲染
  if (isInstalled || !showPrompt) return null

  return (
    <AnimatePresence>
      <motion.div
        className='fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-white rounded-full shadow-xl p-4 flex items-center gap-4 max-w-md'
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3 }}
      >
        <div className='flex items-center gap-3'>
          <div className='bg-brand rounded-full p-3 text-white'>
            <DownloadIcon className='h-6 w-6' />
          </div>
          <div>
            <p className='font-medium text-gray-900'>安装应用</p>

          </div>
        </div>
        <div className='flex gap-2'>
          <motion.button
            onClick={handleCloseClick}
            className='px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-full transition-colors'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            稍后
          </motion.button>
          <motion.button
            onClick={handleInstallClick}
            className='px-6 py-2 text-sm font-medium text-white bg-brand hover:bg-brand/90 rounded-full transition-colors'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            安装
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}