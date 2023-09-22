/// <reference types="react" />
import './index.css';
type Props = {
    fetchData: (page?: number, search?: string) => Promise<{
        value: any;
        label: string;
    }[]>;
    onChange: () => void;
};
declare const Select: React.FC<Props>;
export default Select;
