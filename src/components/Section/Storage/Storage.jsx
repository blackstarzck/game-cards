import React, { useState } from 'react'
import Card from '../../cointainer/Card/Card'
import { SearchInput } from '../../Input/Input'
import { FilterContainer, FilterWrapper, StorageSection } from './Storage.element'

const SectionStorage = ({login, cards}) => {
    return (
        <StorageSection>
            <div className="top">
                <Filter login={login} />
                <SearchInput login={login} />
            </div>
            <ul className="body">
                { cards.CARDS.map((item) => <Card login={login} info={item} key={item.KEY} /> ) }
            </ul>
        </StorageSection>
    )
}

export default SectionStorage

export const Filter = () => {
    return(
        <FilterContainer>
            <span className="heading">정렬</span>
            <FilterWrapper>
                <li><button>LEVEL</button></li>
                <li><button>STR</button></li>
                <li><button>AGI</button></li>
                <li><button>DEX</button></li>
                <li><button>VIT</button></li>
                <li><button>LUCK</button></li>
            </FilterWrapper>
        </FilterContainer>
    );
}