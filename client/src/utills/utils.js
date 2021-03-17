export const errorHandler = (err) => {
    const reduceErrors = err.reduce((result, item)=>{
      const newItem = {[item.param] : item.msg}
      return {...result, ...newItem}
    },{})
    return reduceErrors
  }

