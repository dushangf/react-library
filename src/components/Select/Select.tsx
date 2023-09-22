import { useEffect, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import ItemList from './ItemList';
import './index.css';

type Props = {
  fetchData: (
    page?: number,
    search?: string
  ) => Promise<{ value: any; label: string }[]>;
  onChange: () => void;
};

const Select: React.FC<Props> = ({ fetchData, onChange }) => {
  const [search, setSearch] = useState('');
  const [showList, setShowList] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchAndSetData = async (page?: number, searchTerm?: string) => {
    setLoading(true);

    const newData = await fetchData(page, searchTerm);
    setList((list: any) => [...list, ...newData]);

    setLoading(false);
  };

  useEffect(() => {
    fetchAndSetData(currentPage, search);
  }, [currentPage, search]);

  return (
    <div className='container'>
      <div className='select'>
        <input
          onChange={(e) => {
            setCurrentPage(1);
            setSearch(e.target.value);
          }}
          onKeyDown={(e) => {
            e.key === 'Backspace' && setInputValue('');
          }}
          onFocus={() => setShowList(true)}
          onBlur={() => setTimeout(() => setShowList(false))}
          value={inputValue ? inputValue : search}
          type='text'
          className='search'
          placeholder='Search'
        />
        <button className='button' onClick={() => setShowList(!showList)}>
          <FiChevronDown />
        </button>
      </div>
      {showList && (
        <ItemList
          listData={list}
          onScrollEnd={() => setCurrentPage((currentPage) => currentPage + 1)}
          onChange={onChange}
          setInputValue={setInputValue}
          setShowList={setShowList}
          loading={loading}
          setLoading={setLoading}
          setCurrentPage={setCurrentPage}
          setSearch={setSearch}
        />
      )}
    </div>
  );
};

export default Select;
