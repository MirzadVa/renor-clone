export default () => {
    return typeof window !== 'undefined' ? localStorage.getItem('editMode') : null
  }
  