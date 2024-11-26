// utils/pagination.js
export const paginate = (data, page, itemsPerPage) => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  };
  
  export const totalPages = (data, itemsPerPage) => {
    return Math.ceil(data.length / itemsPerPage);
  };
  