import axios from "axios";

export const getAllAgents = async () => {
  try {
    const { data } = await axios.get("/api/agents/");
    return data;
  } catch (error) {
    alert("Something went wrong.");
  }
};

export const getAllCustomers = async () => {
  try {
    const { data } = await axios.get("/api/customers/");
    return data;
  } catch (error) {
    alert("Something went wrong.");
  }
};

export const getAgentConvos = async (agentId) => {
  try {
    const { data } = await axios.get("/api/conversations/agent/" + agentId);
    return data;
  } catch (error) {
    alert("Something went wrong.");
  }
};

export const getAgentConvosUnalloted = async () => {
  try {
    const { data } = await axios.get("/api/conversations/unalloted");
    return data;
  } catch (error) {
    alert("Something went wrong.");
  }
};

export const getCustomersConvos = async (custId) => {
  try {
    const { data } = await axios.get("/api/conversations/cust/" + custId);
    return data;
  } catch (error) {
    alert("Something went wrong.");
  }
};

export const allotQuery = async (body) => {
  try {
    const { data } = await axios.post("/api/conversations/allot", body);
    return data;
  } catch (error) {
    alert("Something went wrong.");
  }
};

export const unAllot = async (body) => {
  try {
    const { data } = await axios.post("/api/conversations/unallot", body);
    return data;
  } catch (error) {
    alert("Something went wrong.");
  }
};

export const searchTextApi = async (body) => {
  try {
    const { data } = await axios.post("/api/messages/search/", body);
    return data;
  } catch (error) {
    alert("Something went wrong.");
  }
};

export const createNewMessage = async (body) => {
  try {
    const { data } = await axios.post("/api/messages", body);
    return data;
  } catch (error) {
    alert("Something went wrong.");
  }
};

export const createConversation = async (body) => {
  try {
    const { data } = await axios.post("/api/conversations/", body);
    return data;
  } catch (error) {
    alert("Something went wrong.");
  }
};


export const getCustomerDetails = async (custId) => {
  try {
    const { data } = await axios.get("/api/customers/" + custId);
    return data;
  } catch (error) {
    alert("Something went wrong.");
  }
};
