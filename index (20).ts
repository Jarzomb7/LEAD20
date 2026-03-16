'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Bell, Mail, MessageCircle, Save, CheckCircle, User } from 'lucide-react'
import toast from 'react-hot-toast'

export default function SettingsPage() {
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [telegramChatId, setTelegramChatId] = useState('')
  const [emailEnabled, setEmailEnabled] = useState(true)
  const [telegramEnabled, setTelegramEnabled] = useState(false)
  const [saving, setSaving] = useState(false)
  const [testing, setTesting] = useState(false)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      const { data: alerts } = await supabase.from('alerts').select('*').eq('user_id', user?.id).maybeSingle()
      if (alerts) {
        setTelegramChatId(alerts.telegram_chat_id || '')
        setEmailEnabled(alerts.email_enabled ?? true)
        setTelegramEnabled(alerts.telegram_enabled ?? false)
      }
    }
    load()
  }, [])

  async function save() {
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase.from('alerts').upsert({
      user_id: user?.id,
      telegram_chat_id: telegramChatId,
      email_enabled: emailEnabled,
      telegram_enabled: telegramEnabled,
    }, { onConflict: 'user_id' })
    setSaving(false)
    if (error) toast.error('Failed to save settings')
    else toast.success('Settings saved!')
  }

  async function testTelegram() {
    if (!telegramChatId) { toast.error('Enter your Telegram Chat ID first'); return }
    setTesting(true)
    try {
      const res = await fetch('/api/alerts/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatId: telegramChatId }),
      })
      const data = await res.json()
      if (data.success) toast.success('Test message sent to Telegram!')
      else toast.error('Failed to send test message. Check your Chat ID.')
    } catch { toast.error('Request failed') }
    setTesting(false)
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Settings</h1>
        <p className="text-gray-500 text-sm">Manage your account and notification preferences</p>
      </div>

      {/* Account */}
      <div className="bg-bg-secondary border border-border-default rounded-2xl p-6 mb-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-accent-blue/20 rounded-lg flex items-center justify-center">
            <User size={16} className="text-accent-blue" />
          </div>
          <h2 className="font-semibold text-white">Account</h2>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">Email</label>
            <input value={user?.email || ''} readOnly className="input-base opacity-60 cursor-not-allowed" />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-bg-secondary border border-border-default rounded-2xl p-6 mb-5">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 bg-accent-blue/20 rounded-lg flex items-center justify-center">
            <Bell size={16} className="text-accent-blue" />
          </div>
          <h2 className="font-semibold text-white">Notifications</h2>
        </div>

        {/* Email toggle */}
        <div className="flex items-center justify-between py-4 border-b border-border-default">
          <div className="flex items-center gap-3">
            <Mail size={18} className="text-gray-500" />
            <div>
              <p className="text-sm font-medium text-white">Email Alerts</p>
              <p className="text-xs text-gray-600">Receive new leads by email</p>
            </div>
          </div>
          <button
            onClick={() => setEmailEnabled(!emailEnabled)}
            className={`w-11 h-6 rounded-full transition-colors relative ${emailEnabled ? 'bg-accent-blue' : 'bg-bg-tertiary'}`}
          >
            <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${emailEnabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </button>
        </div>

        {/* Telegram toggle */}
        <div className="flex items-center justify-between py-4 border-b border-border-default">
          <div className="flex items-center gap-3">
            <MessageCircle size={18} className="text-gray-500" />
            <div>
              <p className="text-sm font-medium text-white">Telegram Alerts</p>
              <p className="text-xs text-gray-600">Instant alerts via Telegram bot</p>
            </div>
          </div>
          <button
            onClick={() => setTelegramEnabled(!telegramEnabled)}
            className={`w-11 h-6 rounded-full transition-colors relative ${telegramEnabled ? 'bg-accent-blue' : 'bg-bg-tertiary'}`}
          >
            <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${telegramEnabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </button>
        </div>

        {/* Telegram Chat ID */}
        <div className="pt-4">
          <label className="text-sm text-gray-400 mb-1.5 block">Telegram Chat ID</label>
          <div className="flex gap-2">
            <input
              value={telegramChatId}
              onChange={e => setTelegramChatId(e.target.value)}
              placeholder="e.g. 123456789"
              className="input-base flex-1"
            />
            <button onClick={testTelegram} disabled={testing} className="btn-secondary whitespace-nowrap">
              {testing ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <CheckCircle size={14} />}
              Test
            </button>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            Message <span className="text-accent-light">@userinfobot</span> on Telegram to get your Chat ID
          </p>
        </div>
      </div>

      <button onClick={save} disabled={saving} className="btn-primary w-full justify-center py-3">
        {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={15} />}
        {saving ? 'Saving...' : 'Save Settings'}
      </button>
    </div>
  )
}
