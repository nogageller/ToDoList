import { atom, useAtom } from 'jotai';

export const mapAtom = atom('');
export const layerAtom = atom('');

export const useMap = () => {
    const [map, setMap] = useAtom(mapAtom);
    return {
        map, 
        setMap
    };
};

export const useLayer = () => {
    const [layer, setLayer] = useAtom(layerAtom);
    return {
        layer,
        setLayer
    };
}

