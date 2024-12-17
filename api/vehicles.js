import instance from ".";

const getAllVehicles = async () => {
  const res = await instance.get("/vehicle/all");
  return res.data;
};

const getVehicle = async (id) => {
  const res = await instance.get(`/vehicle/${id}`);
  console.log(res);
  return res.data;
};

export { getAllVehicles, getVehicle };
