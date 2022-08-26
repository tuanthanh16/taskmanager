const url =
  "https://movie-database-4me-default-rtdb.europe-west1.firebasedatabase.app/tasks.json";

const baseURL = url.slice(0, url.length - 5) + "/";

export async function postData(data) {
  const response = await fetch(url, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}
export async function getData(id) {
  const idURL = baseURL + id + ".json";
  const response = await fetch(idURL, {
    method: "GET",
  });
  const data = await response.json();
  return data;
}

export async function putData(id, data) {
  const idURL = baseURL + id + ".json";
  const response = await fetch(idURL, {
    method: "PUT",
    body: data,
  });
}

export async function deleteData(id) {
  const idURL = baseURL + id + ".json";
  await fetch(idURL, {
    method: "DELETE",
  });
}
