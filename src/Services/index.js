import api from './axios';

// party management
export const createParty = (data) => api('add-party', 'POST', data);
export const fetchParty = (limit = 1000, page = 1,name) => api(`fetch-party?limit=${limit}&page${page}&custom=true&name=${name}`, 'GET');
export const fetchOutsideParty = (limit = 1000, page = 1,name,type = 0) => api(`fetch-party?limit=${limit}&page${page}&custom=true&name=${name}&type=${type}`, 'GET');
export const fetchUniqueParty = () => api(`fetch-unique-parties`, 'GET');
export const deleteParty = (id) => api(`delete-party/${id}`,'GET')
export const updateParty = (data) => api(`update-party`,'PATCH',data)
export const getStockById = (id) => api(`stockById/${id}`,'GET')

// stock management
export const addStoke = (data) => api(`add-stock`,'POST',data);
export const fetchStoke = (limit = 1000, page = 1) => api(`fetch-stock?limit=${limit}&page${page}&custom=true`, 'GET');
export const deleteStock = (id) => api(`delete-stock/${id}`,'GET')
export const getStockByParty = (id,limit=1000,page=1) => api(`fetch-stock?party=${id}&limit=${limit}&page${page}`,'GET')
export const updateStock = (data) => api(`update-stock`,'PATCH',data)
export const fetchUniqueStocks = () => api(`fetch-unique-stocks`, 'GET');