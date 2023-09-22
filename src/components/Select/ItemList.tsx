import { useEffect, useRef } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import './index.css'

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
  const scrollRef = useRef(null);

  useEffect(() => {
    const elementRef = scrollRef.current as any;

    const handleScroll = async () => {
      if (scrollRef.current) {
        if (
          elementRef.scrollTop ===
          elementRef.scrollHeight - elementRef.clientHeight
        ) {
          setLoading(true);
          setCurrentPage((currentPage: number) => currentPage + 1);
          setLoading(false);
        } else {
          setLoading(false);
        }
      }
    };

    const element = scrollRef.current as any;
    element.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='item-list-container'>
      <div ref={scrollRef} className='item-list'>
        {listData.map((item: any, idx: number) => (
          <li
            onClick={() => {
              setSearch('');
              onChange(item);
              setInputValue(item.label);
              setShowList(false);
            }}
            key={idx}
            className='item'
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
