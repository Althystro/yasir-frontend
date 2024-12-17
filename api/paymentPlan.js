import instance from ".";

const getPaymentPlan = async ({ id }) => {
  const res = await instance.get(`/api/paymentPlans/all/${id}`);
  return res.data;
};

const createPaymentPlan = async (paymentPlan) => {
  console.log(paymentPlan);
  try {
    const res = await instance.post("/api/paymentPlans/create", paymentPlan);
    return res.data;
  } catch (error) {
    console.log("Error creating Paymentplan:", error);
  }
};

const getPaymentPlanByUserId = async (id) => {
  const res = await instance.get(`/api/paymentPlans/all/${id}`);
  return res.data;
};

const getFinancers = async () => {
  try {
    const res = await instance.get("/api/financers");
    return res.data;
  } catch (error) {
    console.error("Error fetching financers:", error);
    throw error;
  }
};

export {
  getPaymentPlan,
  createPaymentPlan,
  getPaymentPlanByUserId,
  getFinancers,
};
