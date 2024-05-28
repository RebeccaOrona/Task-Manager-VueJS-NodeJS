import instance from "srcf/plugins/axios";

export const fetchStatusHistory = async () => {
  try {
    const response = await instance.get("statusHistory/");
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const deleteStatusHistory = async (id) => {
  try {
    const response = await instance.delete(`statusHistory/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting tasks:", error);
    throw error;
  }
};
