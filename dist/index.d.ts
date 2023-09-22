/// <reference types="react" />
type Props$1 = {
    fetchData: (page?: number, search?: string) => Promise<{
        value: any;
        label: string;
    }[]>;
    onChange: () => void;
};
declare const Select: React.FC<Props$1>;

type Props = any;
declare const ItemList: React.FC<Props>;

export { ItemList, Select };
