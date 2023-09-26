import { UIEvent, useEffect, useRef } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import './index.css';

type Props = any;

const ItemList: React.FC<Props> = ({
  listData,
  onChange,
  setInputValue,
  setShowList,
  loading,
  setLoading,
  setCurrentPage,
  setSearch,
}) => {
  const handleScroll = (e: UIEvent) => {
    const target = e.target as HTMLElement;
    if (target.scrollTop >= target.scrollHeight - target.clientHeight - 1) {
      setLoading(true);
      setCurrentPage((currentPage: number) => currentPage + 1);
      setLoading(false);
    }
  };

  return (
    <div className='item-list-container'>
      <div className='item-list' onScroll={(e) => handleScroll(e)}>
        {listData.map((item: any, idx: number) => (
          <li
            onClick={() => {
              setSearch('');
              onChange(item);
              setInputValue(item.label);
              setShowList(false);
            }}
            key={idx}
            className='item bg-blue-300'
          >
            {item.label.slice(0, 30)}
          </li>
        ))}
      </div>
      {loading && (
        <li className='loader'>
          <ImSpinner2 className='spinner' />
          Loading
        </li>
      )}
    </div>
  );
};

export default ItemList;
