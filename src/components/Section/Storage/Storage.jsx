import React, { useState } from 'react'
import { useEffect } from 'react'
import Card from '../../cointainer/Card/Card'
import { SearchInput } from '../../Input/Input'
import { FilterContainer, FilterWrapper, StorageSection } from './Storage.element'

const SectionStorage = ({login, cards, setCards}) => {
    console.log(cards.CARDS);
    return (
        <StorageSection>
            <div className="top">
                <Filter
                    login={login}
                    cards={cards}
                    setCards={setCards} />
                {/* <SearchInput login={login} /> */}
            </div>
            <ul className="body">
                { cards.CARDS.map((item) => <Card 
                    login={login}
                    info={item}
                    cards={cards}
                    setCards={setCards}
                    key={item.KEY} /> ) }
            </ul>
        </StorageSection>
    )
}

export default SectionStorage

export const Filter = ({cards, setCards}) => {
    const [ order, setOrder ] = useState("");

    const handleOrder = (priority) => {
        const tempArr = cards.CARDS.sort(function(a, b) { // 오름차순
            return a.STATS[priority] > b.STATS[priority] ? -1 : a.STATS[priority] < b.STATS[priority] ? 1 : 0;
        });

        setCards({...cards, CARDS: tempArr });
        setOrder(order => order = priority);
        console.log(tempArr);
    }

    const active = { fontWeight: 700 }

    return(
        <FilterContainer>
            <span className="heading">정렬</span>
            <FilterWrapper>
                <li><button className={order === "LEVEL" ? "active" : ""} onClick={() => handleOrder("LEVEL")}>LEVEL</button></li>
                <li><button className={order === "STR" ? "active" : ""} onClick={() => handleOrder("STR")}>STR</button></li>
                <li><button className={order === "AGI" ? "active" : ""} onClick={() => handleOrder("AGI")}>AGI</button></li>
                <li><button className={order === "DEX" ? "active" : ""} onClick={() => handleOrder("DEX")}>DEX</button></li>
                <li><button className={order === "VIT" ? "active" : ""} onClick={() => handleOrder("VIT")}>VIT</button></li>
                <li><button className={order === "LUCK" ? "active" : ""} onClick={() => handleOrder("LUCK")}>LUCK</button></li>
            </FilterWrapper>
        </FilterContainer>
    );
}