import { useState } from 'react'
import {
  Sparkles,
  Lock,
  Mail,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  LoaderCircle,
  CircleAlert,
  ShieldCheck,
  FileSearch,
  ListChecks,
  FileText,
} from 'lucide-react'

interface LoginProps {
  onLoginSuccess: () => void
}

type FieldName = 'name' | 'email' | 'password'

type Errors = Partial<Record<FieldName, string>>

const MOCK_AUTH_DELAY_MS = 600

const highlights = [
  {
    icon: FileSearch,
    title: 'Elicitação assistida',
    description:
      'A partir de uma descrição em linguagem natural, obtém requisitos estruturados e rastreáveis.',
  },
  {
    icon: ListChecks,
    title: 'Separação automática',
    description:
      'Os requisitos funcionais e não funcionais são identificados e apresentados em separado.',
  },
  {
    icon: FileText,
    title: 'Documentação exportável',
    description: 'A especificação fica disponível para consulta e exportação a qualquer momento.',
  },
]

const fieldClass = (invalid: boolean) =>
  [
    'peer h-12 w-full rounded-xl border bg-slate-900/60 pl-11 text-sm text-slate-100',
    'placeholder:text-slate-500 outline-none transition focus:ring-4',
    invalid
      ? 'border-red-500/70 focus:border-red-400 focus:ring-red-500/15'
      : 'border-slate-700/80 focus:border-indigo-400 focus:ring-indigo-500/15',
  ].join(' ')

const validateFields = (values: {
  name: string
  email: string
  password: string
  isRegister: boolean
}): Errors => {
  const found: Errors = {}

  if (values.isRegister && !values.name.trim()) {
    found.name = 'Indique o seu nome completo.'
  }

  if (!values.email.trim()) {
    found.email = 'Indique o seu e-mail.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    found.email = 'O formato do e-mail não é válido.'
  }

  if (!values.password) {
    found.password = 'Indique a palavra-passe.'
  } else if (values.isRegister && values.password.length < 8) {
    found.password = 'A palavra-passe deve ter pelo menos 8 caracteres.'
  }

  return found
}

const iconClass = (invalid: boolean) =>
  [
    'pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 transition-colors',
    invalid ? 'text-red-400' : 'text-slate-500 peer-focus:text-indigo-400',
  ].join(' ')

export function Login({ onLoginSuccess }: LoginProps) {
  const [isRegister, setIsRegister] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => validateFields({ name, email, password, isRegister })

  const showError = (field: FieldName) =>
    Boolean(errors[field]) && (submitted || Boolean(touched[field]))

  const handleChange = (field: FieldName, value: string) => {
    if (field === 'name') setName(value)
    else if (field === 'email') setEmail(value)
    else setPassword(value)

    if (showError(field)) {
      setErrors(
        validateFields({
          name: field === 'name' ? value : name,
          email: field === 'email' ? value : email,
          password: field === 'password' ? value : password,
          isRegister,
        })
      )
    }
  }

  const handleBlur = (field: FieldName) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors(validate())
  }

  const switchMode = (next: boolean) => {
    setIsRegister(next)
    setShowPassword(false)
    setErrors({})
    setTouched({})
    setSubmitted(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const found = validate()
    setErrors(found)
    setSubmitted(true)

    if (Object.keys(found).length > 0) return

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      onLoginSuccess()
    }, MOCK_AUTH_DELAY_MS)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 p-4 text-slate-100 sm:p-6">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="animate-reqai-drift absolute -top-48 -left-40 size-[30rem] rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="animate-reqai-drift-slow absolute -right-40 -bottom-48 size-[30rem] rounded-full bg-violet-600/20 blur-3xl" />
      </div>

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl bg-slate-900/80 shadow-2xl shadow-black/60 ring-1 ring-white/10 backdrop-blur-xl lg:grid-cols-2">
        <aside className="relative hidden flex-col justify-between overflow-hidden bg-linear-to-br from-indigo-600 via-indigo-700 to-violet-800 p-10 lg:flex">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:36px_36px]"
          />
          <div
            aria-hidden="true"
            className="absolute -top-24 -right-24 size-72 rounded-full bg-white/20 blur-3xl"
          />

          <div className="relative flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25">
              <Sparkles className="size-5 text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-white">ReqAI</span>
          </div>

          <div className="relative">
            <h2 className="text-3xl leading-tight font-bold tracking-tight text-balance text-white">
              Da descrição do projeto à especificação completa.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-indigo-100/80">
              Descreva o que pretende construir. O ReqAI organiza a informação em requisitos
              funcionais e não funcionais, prontos a documentar.
            </p>

            <ul className="mt-8 space-y-5">
              {highlights.map(({ icon: Icon, title, description }) => (
                <li key={title} className="flex gap-3.5">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15 transition-colors group-hover:bg-white/20">
                    <Icon className="size-[18px] text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{title}</p>
                    <p className="mt-0.5 text-[13px] leading-relaxed text-indigo-100/70">
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <p className="relative flex items-center gap-2 text-xs text-indigo-100/60">
            <ShieldCheck className="size-4" />
            Desenvolvido para equipas de engenharia de software
          </p>
        </aside>

        <section className="flex flex-col justify-center p-8 sm:p-12">
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <div className="flex size-9 items-center justify-center rounded-xl bg-indigo-500/15 ring-1 ring-indigo-400/25">
              <Sparkles className="size-5 text-indigo-300" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-white">ReqAI</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white">
            {isRegister ? 'Criar conta' : 'Iniciar sessão'}
          </h1>
          <p className="mt-1.5 text-sm text-slate-400">
            {isRegister
              ? 'Preencha os dados abaixo para criar o seu acesso.'
              : 'Introduza as suas credenciais para aceder à plataforma.'}
          </p>

          <div className="mt-7 grid grid-cols-2 gap-1 rounded-xl border border-slate-800 bg-slate-800/50 p-1">
            {[
              { label: 'Iniciar sessão', active: !isRegister, next: false },
              { label: 'Criar conta', active: isRegister, next: true },
            ].map(({ label, active, next }) => (
              <button
                key={label}
                type="button"
                aria-pressed={active}
                onClick={() => switchMode(next)}
                className={`cursor-pointer rounded-lg px-3 py-2 text-[13px] font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                  active
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
            <fieldset disabled={isLoading} className="space-y-4">
              <legend className="sr-only">Dados de acesso</legend>

              {isRegister && (
                <div className="animate-reqai-enter">
                  <label htmlFor="name" className="mb-2 block text-[13px] font-medium text-slate-300">
                    Nome completo
                  </label>
                  <div className="relative">
                    <input
                      id="name"
                      required
                      type="text"
                      autoComplete="name"
                      aria-invalid={showError('name')}
                      aria-describedby={showError('name') ? 'name-error' : undefined}
                      value={name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      onBlur={() => handleBlur('name')}
                      placeholder="O seu nome completo"
                      className={`${fieldClass(showError('name'))} pr-4`}
                    />
                    <User className={iconClass(showError('name'))} />
                  </div>
                  {showError('name') && (
                    <p id="name-error" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
                      <CircleAlert className="size-3.5 shrink-0" />
                      {errors.name}
                    </p>
                  )}
                </div>
              )}

              <div>
                <label htmlFor="email" className="mb-2 block text-[13px] font-medium text-slate-300">
                  E-mail
                </label>
                <div className="relative">
                  <input
                    id="email"
                    required
                    type="email"
                    autoComplete="email"
                    aria-invalid={showError('email')}
                    aria-describedby={showError('email') ? 'email-error' : undefined}
                    value={email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    placeholder="nome@exemplo.com"
                    className={fieldClass(showError('email'))}
                  />
                  <Mail className={iconClass(showError('email'))} />
                </div>
                {showError('email') && (
                  <p id="email-error" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
                    <CircleAlert className="size-3.5 shrink-0" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-[13px] font-medium text-slate-300">
                  Palavra-passe
                </label>
                <div className="relative">
                  <input
                    id="password"
                    required
                    type={showPassword ? 'text' : 'password'}
                    autoComplete={isRegister ? 'new-password' : 'current-password'}
                    aria-invalid={showError('password')}
                    aria-describedby={showError('password') ? 'password-error' : undefined}
                    value={password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    onBlur={() => handleBlur('password')}
                    placeholder="Introduza a palavra-passe"
                    className={`${fieldClass(showError('password'))} pr-12`}
                  />
                  <Lock className={iconClass(showError('password'))} />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? 'Ocultar palavra-passe' : 'Mostrar palavra-passe'}
                    className="absolute right-1.5 top-1/2 flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-800 hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                  >
                    {showPassword ? <EyeOff className="size-[18px]" /> : <Eye className="size-[18px]" />}
                  </button>
                </div>
                {showError('password') ? (
                  <p id="password-error" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
                    <CircleAlert className="size-3.5 shrink-0" />
                    {errors.password}
                  </p>
                ) : (
                  isRegister && (
                    <p className="mt-1.5 text-xs text-slate-500">Mínimo de 8 caracteres.</p>
                  )
                )}
              </div>
            </fieldset>

            <button
              type="submit"
              disabled={isLoading}
              className="group mt-2 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-500 to-violet-500 text-sm font-semibold text-white shadow-lg shadow-indigo-950/50 transition hover:from-indigo-400 hover:to-violet-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" />
                  <span>A processar…</span>
                </>
              ) : (
                <>
                  <span>{isRegister ? 'Criar conta' : 'Iniciar sessão'}</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-[13px] text-slate-500">
            {isRegister ? 'Já tem uma conta?' : 'Ainda não tem conta?'}{' '}
            <button
              type="button"
              onClick={() => switchMode(!isRegister)}
              className="cursor-pointer rounded font-semibold text-indigo-400 transition-colors hover:text-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
            >
              {isRegister ? 'Iniciar sessão' : 'Criar conta'}
            </button>
          </p>
        </section>
      </div>
    </div>
  )
}
