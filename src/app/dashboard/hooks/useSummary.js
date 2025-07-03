const useSummary = () => {
  const dataSummary = [
    {
      title: 'Tareas Prioritarias',
      total: 12,
      color: 'error',
      icon: (
        <img
          alt='icon'
          src={'/assets/img/ic_glass_message.png'}
          width={50}
          height={50}
        />
      ),
    },
    {
      title: 'Tareas Pendientes',
      total: 150,
      color: 'warning',
      icon: (
        <img
          alt='icon'
          src={'/assets/img/ic_glass_buy.png'}
          width={50}
          height={50}
        />
      ),
    },
    {
      title: 'Procesos en Curso',
      total: 20,
      color: 'info',
      icon: (
        <img
          alt='icon'
          src={'/assets/img/ic_glass_users.png'}
          width={50}
          height={50}
        />
      ),
    },
  ]
  return { dataSummary }
}
export default useSummary
