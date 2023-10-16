import React, { useState } from "react"
import Mussarela from "../../assets/pizza-flavours/mucarela.png"
import ChickenWithCheese from "../../assets/pizza-flavours/frango-catupiry.png"
import Margherita from "../../assets/pizza-flavours/margherita.png"
import Lusa from "../../assets/pizza-flavours/portuguesa.png"


const sizeOptions = [
  {
    id: "10",
    flavours: 1,
    size: 35,
    slices: 8,
    text: "Grande",
  },
  {
    id: "11",
    flavours: 2,
    size: 35,
    slices: 8,
    text: "Grande",
  },
  {
    id: "20",
    flavours: 1,
    size: 28,
    slices: 4,
    text: "Média",
  },
  {
    id: "21",
    flavours: 2,
    size: 28,
    slices: 4,
    text: "Média",
  },
  {
    id: "30",
    flavours: 1,
    size: 18,
    slices: 1,
    text: "Broto",
  },
  {
    id: "31",
    flavours: 2,
    size: 18,
    slices: 1,
    text: "Broto",
  },
]

const flavoursOptions = [
  {
    id: "10",
    image: Mussarela,
    name: "Mussarela",
    description:
      "Muçarela especial fresca, finalizada com orégano e azeitonas portuguesas.",
    price: {
      "8": 71,
      "4": 35.5,
      "1": 18,
    },
  },
  {
    id: "11",
    image: ChickenWithCheese,
    name: "Frango com catupiry",
    description:
      "Peito de frango cozido, desfiado e refogado em azeite de oliva e temperos naturais, anéis de cebola sobre base de muçarela especial, bacon em cubos e Catupiry® gratinado. É finalizada com orégano.",
    price: {
      "8": 95,
      "4": 47.5,
      "1": 24,
    },
  },
  {
    id: "12",
    image: Margherita,
    name: "Margherita",
    description:
      "Muçarela especial, muçarela de búfala rasgada, fatias de tomate finalizada com folhas de manjericão orgânico e um fio de azeite aromatizado.",
    price: {
      "8": 90,
      "4": 45,
      "1": 22.5,
    },
  },
  {
    id: "13",
    image: Lusa,
    name: "Portuguesa",
    description:
      "Clássica pizza, leva presunto magro, cebola, palmito e ervilha sobre base de muçarela fresca. Finalizada com cobertura de ovos, orégano e azeitonas portuguesas. ",
    price: {
      "8": 93,
      "4": 46.5,
      "1": 23.5,
    },
  },
]

const PizzaList = () => {
  const [selectedFlavours, setSelectedFlavours] = useState([])
  const [orders, setOrders] = useState([])

  const handleFlavourChange = (event) => {
    const selectedFlavourId = event.target.value
    if (selectedFlavours.includes(selectedFlavourId)) {
      setSelectedFlavours(selectedFlavours.filter((id) => id !== selectedFlavourId))
    } else if (selectedFlavours.length < 2) {
      setSelectedFlavours([...selectedFlavours, selectedFlavourId])
    }
  }

  const handleConfirmOrder = () => {
    if (selectedFlavours.length >= 1 && selectedFlavours.length <= 2) {
      const newOrder = {
        id: Date.now(),
        flavours: selectedFlavours.map((flavourId) =>
          flavoursOptions.find((flavour) => flavour.id === flavourId)
        ),
      }
      setOrders([...orders, newOrder])
      setSelectedFlavours([])
    } else {
      alert('Por favor, escolha exatamente 2 sabores para confirmar o pedido.')
    }
  }

  return (
    <div>
      <h2>Escolha de sabores:</h2>
      {flavoursOptions.map((flavour) => (
        <div key={flavour.id}>
          <label>
            <input
              type="checkbox"
              value={flavour.id}
              checked={selectedFlavours.includes(flavour.id)}
              onChange={handleFlavourChange}
            />
            {flavour.name}
          </label>
        </div>
      ))}

      <button onClick={handleConfirmOrder}>Confirmar Pedido</button>

      <h2>Histórico de pedidos:</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Pedido {order.flavours.length > 1 ? 'de dois sabores' : 'de um sabor'}:{" "}
            {order.flavours.map((flavour) => flavour.id === "custom" ? `Personalizado (${flavour.name})` : flavour.name).join(", ")}
          </li>
        ))}
      </ul>
    </div>
  )
}


export default PizzaList