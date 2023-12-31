import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Image from "next/image";
import { CartContext, type CartItem } from "~/utils/cartContext";
import { type CartContextType } from "~/utils/cartContext";

interface ProductData {
  id: number;
  title: string;
  description: string;
  price: number;
  imageURL: string;
  sizeOptions: { id: number; label: string }[];
}

export default function ProductPage() {
  const [product, setProduct] = useState<ProductData | null>();
  const { addToCart, cartItems } = useContext<CartContextType>(CartContext);
  const [selectedSize, setSelectedSize] = useState<{ id: number; label: string } | null>(null);

  useEffect(() => {
    // Fetch product information from the API
    async function fetchProductDetails() {
      try {
        const response = await fetch('https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product');
        const data = await response.json() as ProductData
        console.log(product)
        setProduct(data); // Update the product state with the fetched data
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    }

    void fetchProductDetails();
  }, []);

  const handleAddToCart = () => {
    console.log("add to cart clicked", cartItems);
    
    if (selectedSize && product) {
      // Find the existing item in the cart with the same product and size
      const existingItem = cartItems.find(
        (item) =>
          item.name === product.title &&
          item.size.some((size) => size.label === selectedSize?.label)
      );
      

      if (existingItem) {
        // If the item already exists in the cart, increase its quantity
        addToCart({ ...existingItem, quantity: existingItem.quantity + 1 });
      } else {
        // If the item doesn't exist in the cart, create a new one and add it to the cart
        const itemToAdd: CartItem = {
          image: product.imageURL,
          name: product.title,
          price: product.price,
          quantity: 1, // Set initial quantity to 1
          size: [selectedSize],
        };
        addToCart(itemToAdd);
      }

      // Reset the selected size
      setSelectedSize(null);
    } else {
      // Show error message if no size is selected (you might want to handle this differently based on your UI)
      const errorMessage = document.querySelector(".error-message");
      if (errorMessage) {
        errorMessage.textContent = "Please select a size.";
      }
    }
  };


  return (
    <>
      <Head>
        <title>Clothing Site</title>
        <meta name="description" content="Made for a technical test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col md:flex-row min-h-screen pt-6">
        <div className="md:flex-1 md:flex justify-center"> 
        {product ? (
          <div className="">
            <Image
              src={product.imageURL}
              alt="Product Image"
              layout="responsive" // Set the layout to responsive
              width={300} // Set a fixed width for the image
              height={400} // Set a fixed height for the image
            />
          </div>
        ) : (
          <div>Loading...</div>
        )}
        </div>
        <div className="md:flex-1 md:flex md:flex-col md:pl-4">

        {product ? (
  <div className="flex-1 flex flex-col pl-4">
  <div className="product-details">
    <h2 className="text-2xl py-4 border-b-2 border-borderLightGrey">{product.title}</h2>
    <p className="font-bold py-2 border-b-2 border-borderLightGrey"> ${product.price.toFixed(2)}</p>
    <p className="mt-6 text-fontSecondary">{product.description}</p>
    <div className="size-options">
      <h3 className="font-semibold text-gray-400 pt-6">Size<span className=" text-requiredStar">*</span></h3>
      <ul className="flex mb-4">
                {product.sizeOptions.map((size) => (
                  <li
                    key={size.id}
                    className={`p-4 m-2 border-2 hover:opacity-30  ${
                      selectedSize?.id === size.id ? ' text-fontPrimary border-borderDarkGrey' : 'border-borderLightGrey text-fontSecondary'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size.label}
                  </li>
                ))}
              </ul>
    </div>
    <button className="border-2 font-semibold border-black px-5 py-2 hover:bg-fontPrimary hover:text-white transition duration-200" onClick={handleAddToCart}>
      Add to Cart
    </button>
    <div className="error-message text-red-600"></div>
  </div>
</div>
) : (
  <div>Loading...</div>
)}
</div>
      </main>
    </>
  );
}
