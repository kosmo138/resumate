"use client"

import { useState } from "react"

export default function CardComponent({ ResumecardList }) {
  const [cards, setCards] = useState(ResumecardList)
  let card = ResumecardList
  const setCard2 = (card2: object) => {
    card = card2
  }

  const handleCloneCard = (id) => {
    const cardToClone = cards.find((card) => card.id === id) // 누른 버튼에 대응하는 카드를 찾습니다.
    if (cardToClone) {
      const clonedCard = { ...cardToClone, id: cards.length + 1 } // 새로운 id를 부여하여 복제된 카드를 생성합니다.
      setCards([...cards, clonedCard]) // 복제된 카드를 기존 카드 리스트에 추가합니다.
    }
  }

  return (
    <div>
      {cards.map((Resumecard) => (
        <div key={card.id}>
          <h3>{card.title}</h3>
          <p>{card.content}</p>
          <button onClick={() => handleCloneCard(card.id)}>
            복제하기
          </button>{" "}
          {/* 버튼 클릭 시 handleCloneCard 함수 호출 */}
        </div>
      ))}
    </div>
  )
}
