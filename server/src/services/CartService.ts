

export class CartService {
//   static async createCart(fanId: number): Promise<Cart> {
//     return await Cart.create({
//       fanId,
//       items: {
//         donationCampaigns: [],
//         souvenirs: [],
//         eventTickets: [],
//         tours: [],
//         clubMemberships: [],
//       },
//     });
//   }


//   static async getCartByFanId(fanId: number): Promise<Cart | null> {
//     return await Cart.findOne({ where: { fanId } });
//   }

//   static async updateCartItems(
//     fanId: number,
//     itemType: keyof CartAttributes["items"],
//     newItems: number[] 
//   ): Promise<Cart> {
//     const cart = await CartService.getCartByFanId(fanId);
//     if (!cart) throw new Error("Cart not found");

//     cart.items[itemType] = newItems;
//     return await cart.save();
//   }
}
