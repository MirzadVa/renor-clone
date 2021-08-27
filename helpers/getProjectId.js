export default () => {
    return typeof window !== 'undefined' ? localStorage.getItem('projectId') : null
  }
  