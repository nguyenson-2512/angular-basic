export const getThisState = (stateName) => {
  try{
      const serializedState = window.sessionStorage.getItem(stateName);
      if(serializedState === null){ return undefined }
      return JSON.parse(serializedState);
  }catch(err){
      return undefined
  }
}

export const getItem = (itemName) => {
  const items = getThisState(itemName)
  if (items === undefined) {
      return {posts : []}
  } else {
      return items
  }
}

export const saveItem = (key,data) => {
  const serializedState = JSON.stringify(data);
  window.sessionStorage.setItem(key,serializedState);
}

export const getItemByKey = (key) => {
  try{
      const serializedState = window.sessionStorage.getItem(key);
      if(serializedState === null){ return undefined }
      return JSON.parse(serializedState);
  }catch(err){
      return undefined
  }
}

export const deleteItemByKey = (key) => window.sessionStorage.setItem(key,null)

export const emptyLocalStorage = (reducerkeys) => {

  try{
      if(undefined != reducerkeys && reducerkeys.length > 0){
          reducerkeys.forEach(key => {
            window.sessionStorage.setItem(key,null);
          })
      }
  }catch(err){
      //console.log("ERROR===emptyLocalStorage==>>>")
  }
}

export const clearStorage = () => window.sessionStorage.clear();
