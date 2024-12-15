import instance from ".";

const getAllVehicles = async () => {
  const res = await instance.get("/vehicle/all");
  return res.data;
};

export default getAllVehicles;
