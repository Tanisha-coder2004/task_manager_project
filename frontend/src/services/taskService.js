import api from "./api"

export const taskService = {
    getAllTasks : async () => {
        const response = await api.get(`/getAllTask`);
        return response.data;
    },
    
    
    deleteTask: async (id) => {
        const response = await api.delete(`/deleteTask/${id}`);
        return response.data;
    },
    
   
   createTask : async (title, description) => {
        const response = await api.post(`/createTask`, { title, description });
        return response.data;
    },

    updateTask: async (id,title,description)=>{
        const response = await api.put(`/updateTask/${id}`,{title,description})
    },
    toggleTaskStatus:async (id)=>{
      const response = await api.post(`/toggleStatus/${id}`);
      return response.data
    }
}