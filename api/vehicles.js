import instance from ".";

const getAllVehicles = async () => {
  try {
    const res = await instance.get("/vehicle/all");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
const getVehicleById = async (id) => {
  try {
    const res = await instance.get(`/vehicle/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
const getAllDealerships = async () => {
  try {
    const res = await instance.get("/vehicle/dealership");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export { getAllVehicles, getVehicleById, getAllDealerships };
