import React from "react";
import "./ListFooter.css"
import { setStorage, storageContext } from '../../utils/storageUtils';

export default function ItemFooter() {
    const {items, setItems, filterItems, setFilterItems} = React.useContext(storageContext);

    const itemsLeft = items.reduce((previousValue, [, complete]) => previousValue + !complete, 0);
    const itemsRight = items.length - itemsLeft;
    const classVisibilityHidden = itemsRight ? '' : ' visibility-hidden';

    const filterAll = filterItems === 'All' ? ' filter-selected' : '';
    const filterActive = filterItems === 'Active' ? ' filter-selected' : '';
    const filterCompleted = filterItems === 'Completed' ? ' filter-selected' : '';

    function handleClearCompleteItems() {
        const itemsNew = items.filter(([, complete]) => complete === false);

        setItems(itemsNew);
        setStorage(itemsNew);
    }

    return (
        <div className='list-footer'>
            <span className='list-footer-counter'>{itemsLeft} items left</span>
            <ul className='list-footer-filters'>
                <li
                    onClick={() => setFilterItems('All')}
                    className={'list-footer-filters-content' + filterAll}
                >All</li>
                <li
                    onClick={() => setFilterItems('Active')}
                    className={'list-footer-filters-content' + filterActive}
                >Active</li>
                <li
                    onClick={() => setFilterItems('Completed')}
                    className={'list-footer-filters-content' + filterCompleted}
                >Completed</li>
            </ul>

            <button className={'list-footer-item-completed-destroy' + classVisibilityHidden}
                onClick={handleClearCompleteItems}
            >Clear completed</button>
        </div>
    )
}
