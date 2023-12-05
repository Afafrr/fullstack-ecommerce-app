import axios from "axios";

// variable containing link to host used in every fetch
const host = "http://localhost:4000";

//get all phones
export async function getPhones() {
  return fetch(`${host}/phones`).then((res) => res.json());
}
//get one phone by Id
export async function getPhone(id) {
  return await fetch(`${host}/phones/${id}`).then((res) => res.json());
}

//get item from db by collection name (category) and its ID
export async function getItem(collection, id) {
  return await fetch(`${host}/${collection}/${id}`).then((res) => res.json());
}

export async function addItemToDB(name, brand, price, collectionName) {
  const accessToken = localStorage.getItem("token");
  return await axios.post(
    `${host}/posts/post`,
    {
      name: name,
      brand: brand,
      price: price,
      collectionName: collectionName,
    },
    {
      headers: { authorization: `Bearer ${accessToken}` },
    }
  );
}

export async function getCollections() {
  return await axios.get(`${host}/collections/`);
}
