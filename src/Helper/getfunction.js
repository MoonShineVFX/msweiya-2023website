// firebase 資料庫連線
import db from '../firebaseConfig/firebase'
import {collection, query,onSnapshot,  getDocs,orderBy,where,limit,limitToLast,startAfter,endBefore,addDoc,deleteDoc,doc,updateDoc,getDoc,arrayUnion,set} from "firebase/firestore"
import { getStorage, ref, getDownloadURL,  } from "firebase/storage";
import { async } from '@firebase/util';
import { FaDove } from 'react-icons/fa';
const storage = getStorage();


/** 
* User
**/
export const getAllUsers = async (callback) =>{
  const q = query(collection(db, "users"), where("display", "==", '1'))
  const data = await getDocs(q);
  mapDataWithUid(data.docs.map(doc=> ({...doc.data(),uid:doc.id})),function(res){
    callback(res)
  })
}
export const getAllUsersForRich = async (callback) =>{
  const q = query(collection(db, "users"), where("display", "==", '1'))
  const data = await getDocs(q);
  mapDataByCoin(data.docs.map(doc=> ({...doc.data(),uid:doc.id})),function(res){
    callback(res)
  })
}
//
export const getAllUsersRealTime = async (callback)=>{
  const q = query(collection(db, "users"), where("display", "==", '1'))
  const unsubscribe = onSnapshot (q, async(querySnapshot) => {
    querySnapshot.forEach((doc) => {
      callback({...doc.data(),uid:doc.id})
    })
   
  })
}
//由phone取得單筆玩家
export const getUserByPhone = async (phone,callback)=>{
  const q = query(collection(db, "users"),where("phone", "==", phone))
 
  const unsubscribe = onSnapshot (q, async(querySnapshot) => {
    querySnapshot.forEach((doc) => {
      callback({...doc.data(),uid:doc.id})
    })
   
  })
}
//由 id 取得單筆玩家
export const getUserByUid = async (uid,callback)=>{
  const q = doc(db , 'users' , uid)
  const docSnap = await getDoc(q);
  callback(docSnap.data())
}


//改變積分
export const updateUserCoinByUid = async (uid,currentData,callback)=>{

  const q = doc(db, 'users',uid)
  try {
    await updateDoc( q ,currentData)
    callback('success')
  } catch (error) {
    callback(error)
  }
}

// 建立新遊戲賽局
// 前台讀取遊戲賽局
export const getAllGame = async (callback) =>{
  const q = query(collection(db, "game"), where("display", "==", '1'))

  const unsubscribe = onSnapshot(q, (querySnapshot) => {

    var game = []
    querySnapshot.forEach((doc) => {
      game.push({...doc.data(),uid:doc.id})
    })
    callback(game)
  })
}
// 後台讀取遊戲賽局
export const getAllGameForBank = async (callback) =>{
  const q = query(collection(db, "game"))
  const data = await getDocs(q);
  mapDataWithUid(data.docs.map(doc=> ({...doc.data(),uid:doc.id})),function(res){
    callback(res)
  })
  
}

export const getGameByUid = async (uid,callback)=>{
  const q = doc(db , 'game' , uid)
  const docSnap = await getDoc(q);
  callback(docSnap.data())
}
//由id取得單筆賽局
export const getGameByGameTitle = async (u_title,callback)=>{
  const q = query(collection(db, "game"),where("u_title", "===", u_title))
 
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      callback({...doc.data(),uid:doc.id})
    })
  })
  // const data = await getDocs(q);
  // data.forEach((doc) => {
  //   const docData = doc.data()
  //   callback(doc.data())
  // });
}

// 刪除

// 紀錄下注
export const updatedGameBetsByGameUid = async (uid,currentData,callback)=>{
  const docRef = doc(db ,"game", uid)
  try{
    await updateDoc(docRef, {
      gambles_list: arrayUnion(currentData)
    });
    callback('success')
  }catch(error){
    callback(error)
  }
}
// 紀錄名次
export const updatedGameRankByGameUid = async (uid,currentData,callback)=>{
  const docRef = doc(db ,"game", uid)
  try{
    await updateDoc(docRef, {
      player: currentData
    });
    // await docRef.set({player: {currentData}},{merge: true})
    callback('success')
  }catch(error){
    callback(error)
  }
}
// 編輯
export const updatedGameByGameUid = async (uid,currentData,callback)=>{
  const docRef = doc(db ,"game", uid)

  try{
    await updateDoc(docRef,currentData);
    callback('success')
  }catch(error){
    callback(error)
  }
}
export const updateGameUserHavePlay  = async (uid,currentData,callback)=>{
  const docRef = doc(db ,"game", uid)
  try{
    await updateDoc(docRef, {
      haveplay_list: arrayUnion(currentData)
    });
    callback('success')
  }catch(error){
    callback(error)
  }
}

// 輸贏選項
//按照積分排列
const mapDataByCoin = async (data, callback)=>{
  let dataSorted = data.sort(function(a, b) {
    return b.sort - a.sort;
  });
  let latestSortNum = (parseInt(dataSorted[0].sort_num)+1).toString()
  const twoarr= dataSorted.map( async (element) => {

    return {...element , latestSortNum :latestSortNum}
   
  })
  callback(await Promise.all(twoarr))
}






//以上是尾牙api
//以上是尾牙api
//以上是尾牙api


/**
 * 取5筆資料
 * **/
export const getNewestWorks = async (callback) =>{
  const q = query(collection(db, "data"),orderBy('time_added' , 'desc'), where("display", "==", '1'),limit(5))
  const data = await getDocs(q);
  mapDataWithImage('data',data.docs.map(doc=> doc.data()),function(res){
    callback(res)
  })
}

/**
 * 到 firebase 撈作品資料表 全部
 * 資料先傳到 mapDataWithImage 處理過圖片路徑再回傳 setWorkData 給網頁用 
 * 條件 display 1 設定顯示的
 * **/ 
export const getWorks = async (callback)=>{
  const q = query(collection(db, "data"),orderBy('time_added' , 'desc'), where("display", "==", '1'))
  const data = await getDocs(q);
  mapDataWithImage('data',data.docs.map(doc=> doc.data()),function(res){
    callback(res)
  })
}
//根據分類id取資料
export const getWorksByCategoryCid = async (cid,callback)=>{
  const q = query(collection(db, "data"), 
    where("category", "==", cid),
    orderBy('time_added' , 'desc'), 
    where("display", "==", '1'))
    ;
  const data = await getDocs(q);

  mapDataWithImage('data',data.docs.map(doc=> doc.data()),function(res){
    callback(res)
  })
}

//由id取得單筆作品
export const getWorkByidForArticle = async (id,callback)=>{
  const q = query(collection(db, "data"),where("id", "==", id))
  const data = await getDocs(q);
  console.log(data)
  // mapDataWithImage('data',data.docs.map(doc=> doc.data()),function(res){
  //   callback(res)
  // })
  data.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const docData = doc.data()
    callback(doc.data())
    // const imgsArray = docData.article.article_images
    // console.log(doc.id, " => ", doc.data());
  });
}
//根據分類id取資料
export const getWorksBySubCategoryCid = async (scid,callback)=>{
  const q = query(collection(db, "data"), 
    where("sub_category", "==", scid),
    orderBy('time_added' , 'desc'), 
    where("display", "==", '1'))
    ;
  const data = await getDocs(q);

  mapDataWithImage('data',data.docs.map(doc=> doc.data()),function(res){
    callback(res)
  })
}


// 處理作品的圖片路徑
const mapDataWithImage =async (folder,data , callback)=>{
  let dataSorted = data.sort(function(a, b) {
    return b.sort_num - a.sort_num;
  });
  const twoarr= dataSorted.map( async (element) => {
    const imagesRef = ref(storage, `${folder}/${element.img}`);
    const newimgurl =await getDownloadURL(imagesRef).catch((error) => {
      switch (error.code) {
        case 'storage/object-not-found':
          break;
        case 'storage/unauthorized':
          break;
        case 'storage/canceled':
          break;
        case 'storage/unknown':
          break;
        default:
          console.log('')
      }
    })
    return {...element , imgpath :newimgurl}
   
  })
  callback(await Promise.all(twoarr))
  // setWorkData(await Promise.all(twoarr))
  // setFilteredWorkData(await Promise.all(twoarr))
}
const mapDataWithUid = async (data, callback)=>{
  let dataSorted = data.sort(function(a, b) {
    return b.sort_num - a.sort_num;
  });
  let latestSortNum = (parseInt(dataSorted[0].sort_num)+1).toString()
  const twoarr= dataSorted.map( async (element) => {

    return {...element , latestSortNum :latestSortNum}
   
  })
  callback(await Promise.all(twoarr))
}


/**
 * 到 firebase 撈分類資料表
 * 不用處理圖片路徑的 直接 set
 * **/ 
 export const getCategory = async (callback)=>{
  const q = query(collection(db, "category"), where("display", "==", '1'))
  const data = await getDocs(q);
  // mapCategoryData(data.docs.map(doc=> doc.data()))
  // callback(data.docs.map(doc=> doc.data()))
  mapDataWithImage('data',data.docs.map(doc=> doc.data()),function(res){
    callback(res)
  })
}


/**
 * query by catergory id
 * 按分類 分好作品  給ROW用
 * **/
export const queryByCategoryId = async (cid,callback)=>{

  const q = query(collection(db, "data"), where("category", "==", cid),orderBy('time_added' , 'desc'), where("display", "==", '1'),limit(15));
  const data = await getDocs(q);
  // console.log(data.docs.map(doc=> doc.data()))
  mapDataWithImage('data',data.docs.map(doc=> doc.data()),function(res){
    callback(res)
  })
}


/**
 * 按照分類ID 取得作品的 並且分頁
 * lastestdoc 很重要
 * **/
let latestDoc = null
export const getWorksByCategoryAndLimits = async (cid,callback)=>{

  const q = query(collection(db, "data"), 
    where("category", "==", cid),
    orderBy('time_added' , 'desc'), 
    where("display", "==", '1'))
    ;
  const data = await getDocs(q);
  latestDoc = data.docs[data.docs.length -1 ]


  mapDataWithImage('data',data.docs.map(doc=> doc.data()),function(res){
    callback(res)
  })
}

export const getNextWorksByCategoryAndLimits = async (cid,callback)=>{
  const q = query(collection(db, "data"), 
    where("category", "==", cid),
    orderBy('time_added' , 'desc'),
    startAfter(latestDoc),
    where("display", "==", '1'),limit(10))
    ;
  const data = await getDocs(q);


  mapDataWithImage('data',data.docs.map(doc=> doc.data()),function(res){
    callback(res)
  })
}



/**
 * 到 firebase 撈作品資料表 
 * 資料先傳到 mapDataWithImage 處理過圖片路徑再回傳 setWorkData 給網頁用 
 * 條件 display 全部 要給後台用(admin) 
 * **/ 
export const getAllWorksForDashboard = async (callback)=>{
  const q = query(collection(db, "data"),orderBy('time_added' , 'desc'),limit(10))
  const data = await getDocs(q);

  mapDataWithImage('data',data.docs.map(doc=> ({...doc.data(),uid:doc.id})),function(res){
    callback(res)
  })
}

export const getNextWorkForDashboard = async (item , callback) => {
  const q = query(collection(db, "data"),orderBy('time_added' , 'desc'),startAfter(item.time_added),limit(12))
  const data = await getDocs(q);
  mapDataWithImage('data',data.docs.map(doc=> ({...doc.data(),uid:doc.id})),function(res){
    callback(res)
  })
}

export const getPrevWorkForDashboard = async (item , callback) => {
  const q = query(collection(db, "data"),orderBy('time_added' , 'desc'),endBefore(item.time_added),limitToLast(12))
  const data = await getDocs(q);
  mapDataWithImage('data',data.docs.map(doc=> ({...doc.data(),uid:doc.id})),function(res){
    callback(res)
  })
}

export const getSearchWork = async (search , callback)=>{
 //TODO
}

export const createWork = async (data , callback)=>{
  const collectionRef = collection(db ,"data")
  try {
    await addDoc(collectionRef,data)
    callback('success')
  } catch (error) {
    callback(error)
  }
}
export const deleteWork = async(uid,callback)=>{
  const workDoc = doc(db , 'data' , uid)
  
  try {
    await deleteDoc(workDoc)
    callback('success')
  } catch (error) {
    callback(error)
  }
}
 export const updateWork = async (uid,currentData,callback)=>{
  const workDoc = doc(db , 'data' , uid)
   
    try {
      await updateDoc( workDoc ,currentData)
      callback('success')
    } catch (error) {
      callback(error)
    }
 }


 //admin category
 export const getAllCategoryForDashboard = async (callback)=>{
  const q = query(collection(db, "category"),orderBy('sort_num' , 'desc'))
  const data = await getDocs(q);
  // mapDataWithUid(data.docs.map(doc=> ({...doc.data(),uid:doc.id})),function(res){
  //   callback(res)
  // })
  mapDataWithImage('img_category',data.docs.map(doc=> ({...doc.data(),uid:doc.id})),function(res){
    callback(res)
  })
}

export const createCategory = async (data , callback)=>{
  const collectionRef = collection(db ,"category")
  try {
    await addDoc(collectionRef,data)
    callback('success')
  } catch (error) {
    callback(error)
  }
}
export const deleteCategory = async(uid,callback)=>{
  const categoryDoc = doc(db , 'category' , uid)
  
  try {
    await deleteDoc(categoryDoc)
    callback('success')
  } catch (error) {
    callback(error)
  }
}
export const updateCategory = async (uid,currentData,callback)=>{
const categoryDoc = doc(db , 'category' , uid)
  
  try {
    await updateDoc( categoryDoc ,currentData)
    callback('success')
  } catch (error) {
    callback(error)
  }
}

// admin Award
export const getAwardForDashboard = async (callback) => {
  const q = query(collection(db, "awards"))
  const data = await getDocs(q);
  mapDataWithImage('img_award',data.docs.map(doc=> ({...doc.data(),uid:doc.id})),function(res){
    callback(res)
  })
}

export const createAward = async (data , callback)=>{
  const collectionRef = collection(db ,"awards")
  try {
    await addDoc(collectionRef,data)
    callback('success')
  } catch (error) {
    callback(error)
  }
}
export const deleteAward = async(uid,callback)=>{
  const awardDoc = doc(db , 'awards' , uid)
  try {
    await deleteDoc(awardDoc)
    callback('success')
  } catch (error) {
    callback(error)
  }
}
export const updateAward = async (uid,currentData,callback)=>{
  const awardDoc = doc(db , 'awards' , uid)
  try {
    await updateDoc( awardDoc ,currentData)
    callback('success')
  } catch (error) {
    callback(error)
  }
}

//admin service
export const getServiceForDashboard = async (callback) => {
  const q = query(collection(db, "service"))
  const data = await getDocs(q);
  mapDataWithImage('img_service',data.docs.map(doc=> ({...doc.data(),uid:doc.id})),function(res){
    callback(res)
  })
}

export const createService = async (data , callback)=>{
  const collectionRef = collection(db ,"service")
  try {
    await addDoc(collectionRef,data)
    callback('success')
  } catch (error) {
    callback(error)
  }
}
export const deleteService = async(uid,callback)=>{
  const serviceDoc = doc(db , 'service' , uid)
  try {
    await deleteDoc(serviceDoc)
    callback('success')
  } catch (error) {
    callback(error)
  }
}
export const updateService = async (uid,currentData,callback)=>{
  const serviceDoc = doc(db , 'service' , uid)
  try {
    await updateDoc( serviceDoc ,currentData)
    callback('success')
  } catch (error) {
    callback(error)
  }
}