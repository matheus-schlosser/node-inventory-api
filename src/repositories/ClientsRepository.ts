import Clients from "../entities/Clients"

export default class ClientsRepository {

  public static async createClient(data: object){
    return await Clients.create(data)
  }

  public static async updateClient(data: object, clientId: string){
    return await Clients.update(data, { 
      where:{
        cl_id: clientId
      }
    })
  }

  public static async getClients(){
    return await Clients.findAll({
      attributes: ['cl_id', 'cl_name', 'cl_responsible', 'cl_phone', 'cl_active']
    })
  }
  
  public static async getClient(clientId: number) {   
    const response = (await Clients.findOne({
      attributes: ['cl_id', 'cl_name', 'cl_responsible', 'cl_phone', 'cl_active'],
      where: {
        cl_id: clientId
      }
    }) as Clients)

    return response
  }

  public static async deleteClient(clientId: number) {   
    const response = (await Clients.findOne({
      where: {
        cl_id: clientId
      }
    }) as Clients)
    
    response.destroy()
  }

  public static async verifyExistingClient(clientName: string) {
    const response = (await Clients.findOne({
      where: {
        cl_name: clientName
      }
    }) as Clients)

    return response
  }

  public static async verifyExistingClientById(clientId: number) {
    const response = (await Clients.findOne({
      where: {
        cl_id: clientId
      }
    }) as Clients)

    return response
  }

}
