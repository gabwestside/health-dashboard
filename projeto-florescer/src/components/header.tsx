export function Header() {
  return (
    <header className='flex items-center justify-between py-6'>
      <h1 className='text-3xl font-semibold'>Dashboard de Acompanhamento</h1>
      <div className='flex items-center gap-3'>
        <button className='rounded-full p-2 hover:bg-muted/50'>
          <span className='material-symbols-outlined'>notifications</span>
        </button>
        <div className='h-9 w-9 rounded-full grid place-items-center bg-secondary text-secondary-foreground'>
          <span className='material-symbols-outlined'>person</span>
        </div>
      </div>
    </header>
  )
}
