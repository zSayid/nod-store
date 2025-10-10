// export const setItem = (key, data) => {
// 	try {
// 		localStorage.setItem(key, data)
// 	} catch (error) {
// 		console.log('Error saving data')
// 	}
// }

// export const getItem = (key) => {
// 	try {
// 		return localStorage.getItem(key)
// 	} catch (error) {
// 		console.log('Error getting data')
// 	}
// }

// export const removeItem = key => {
// 	try {
// 		localStorage.removeItem(key)
// 	} catch (error) {
// 		console.log('Error removing data')
// 	}
// }





export const setItem = (key, value) => {
	try {
	  localStorage.setItem(key, JSON.stringify(value));
	} catch (error) {
	  console.error("LocalStorage set error:", error);
	}
  };
  
  export const getItem = (key) => {
	try {
	  const data = localStorage.getItem(key);
	  return data ? JSON.parse(data) : null;
	} catch (error) {
	  console.error("LocalStorage get error:", error);
	  return null;
	}
  };
  
  export const removeItem = (key) => {
	try {
	  localStorage.removeItem(key);
	} catch (error) {
	  console.error("LocalStorage remove error:", error);
	}
  };
  