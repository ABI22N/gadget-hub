import commanAPI from "./commanAPI";
import BASEURL from "./serverURL";

export const addGadgetAPI = async (reqBody) => {
  return await commanAPI("POST", `${BASEURL}/gadgets`, reqBody);
};

export const getGadgetAPI = async (id) => {
  return await commanAPI("GET", `${BASEURL}/gadgets/${id}`, {});
};

export const updateGadgetAPI = async (id, reqBody) => {
  return await commanAPI("PUT", `${BASEURL}/gadgets/${id}`, reqBody);
};

export const getAllGadgetAPI = async () => {
  return await commanAPI("GET", `${BASEURL}/gadgets`);
};

export const deleteGadgetAPI = async (id) => {
  return await commanAPI("DELETE", `${BASEURL}/gadgets/${id}`);
};