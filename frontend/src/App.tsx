import { useState } from 'react'
import { Login } from './pages/Login'
import { Sparkles, Send, FileText, CheckCircle2, Copy, LogOut } from 'lucide-react'

export function App() {
  // Define que por padrão o utilizador NÃO está autenticado (mostra a Login)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [requirements, setRequirements] = useState<string | null>(null)

  // Se não estiver logado, rendeiriza apenas a página de Login
  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!description.trim()) return

    setIsLoading(true)
    setTimeout(() => {
      setRequirements(`
### Requisitos Funcionais (RF)
- [RF01] O sistema deve permitir o cadastro de utilizadores com e-mail e palavra-passe.
- [RF02] O sistema deve permitir a entrada de descrições do projeto via texto.

### Requisitos Não-Funcionais (RNF)
- [RNF01] O tempo de resposta da IA não deve exceder 5 segundos.
      `)
      setIsLoading(false)
    }, 1500)
  }

  // Se estiver logado, rendeiriza o painel principal do ReqAI
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-indigo-400">
          <Sparkles className="w-6 h-6" />
          <h1 className="text-xl font-bold tracking-wide">ReqAI</h1>
        </div>
        <button
          onClick={() => setIsAuthenticated(false)}
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700 py-1.5 px-3 rounded-lg transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sair
        </button>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-5 flex flex-col justify-between">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                Descrição do Projeto
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: Preciso de uma aplicação para uma barbearia..."
                className="w-full h-48 bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !description.trim()}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              {isLoading ? 'A analisar...' : 'Gerar Requisitos'}
            </button>
          </form>
        </section>

        <section className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-5 flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-slate-700/60 mb-4">
            <h2 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Requisitos Elicitados
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto bg-slate-900/60 rounded-lg p-4 font-mono text-xs text-slate-300 whitespace-pre-line border border-slate-800/80">
            {requirements || 'Preencha a descrição ao lado para gerar os requisitos.'}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App