const BASE_URI = "http://localhost:3000/api";

import IAgent from "@/interfaces/IAgent";
import IFacility from "@/interfaces/IFacility";
import IShift from "@/interfaces/IShift";

export const getAgents = async () => {
  const response = await fetch(`${BASE_URI}/agents/`);
  const json = await response.json();

  return json.response as IAgent[];
};

export const getAgent = async (agentId: string | undefined) => {
  const response = await fetch(`${BASE_URI}/agents/${agentId}`);
  const json = await response.json();

  return json.response as IAgent;
};

export const addAgent = async (formData: any) => {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    console.log("formData=>", formData);

    const response = await fetch(`${BASE_URI}/agents`, options);
    const json = await response.json();

    console.log("json=>", json);

    return json.response as IAgent;
  } catch (error) {
    console.log("error->", error);
    return error;
  }
};

export const updateAgent = async (agentId: string, formData: any) => {
  try {
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    const response = await fetch(`${BASE_URI}/agents/${agentId}`, options);
    const json = await response.json();

    return json.response as IAgent;
  } catch (error) {
    return error;
  }
};

export const deleteAgent = async (agentId: string) => {
  try {
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(`${BASE_URI}/agents/${agentId}`, options);
    const json = await response.json();

    return json.response as IAgent;
  } catch (error) {
    return error;
  }
};

/// Facilities
export const getFacilities = async () => {
  const response = await fetch(`${BASE_URI}/facilities/`);
  const json = await response.json();

  return json.response as IFacility[];
};

export const getFacility = async (Id: string | undefined) => {
  const response = await fetch(`${BASE_URI}/facilities/${Id}`);
  const json = await response.json();

  return json.response as IFacility[];
};

export const addFacility = async (formData: any) => {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    const response = await fetch(`${BASE_URI}/facilities`, options);
    const json = await response.json();

    return json.response as IFacility;
  } catch (error) {
    return error;
  }
};

export const deleteFacility = async (facilityId: string) => {
  try {
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(
      `${BASE_URI}/facilities/${facilityId}`,
      options
    );
    const json = await response.json();

    return json.response as IFacility;
  } catch (error) {
    return error;
  }
};

// Shifts
export const getShifts = async () => {
  const response = await fetch(`${BASE_URI}/shifts/`);
  const json = await response.json();

  return json.response as IShift[];
};

export const addShift = async (formData: any) => {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    const response = await fetch(`${BASE_URI}/shifts`, options);
    const json = await response.json();

    return json.response as IShift;
  } catch (error) {
    return error;
  }
};

export const deleteShift = async (Id: string) => {
  try {
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(`${BASE_URI}/shifts/${Id}`, options);
    const json = await response.json();

    return json.response as IShift;
  } catch (error) {
    return error;
  }
};

export const getShiftsByFacility = async (facilityId: string | undefined) => {
  const response = await fetch(`${BASE_URI}/facilities/${facilityId}`);
  const json = await response.json();

  return json.response as IAgent;
};
