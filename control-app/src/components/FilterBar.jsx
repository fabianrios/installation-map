import { useTranslation } from '../LanguageContext';

function FilterBar({ lugares, artistas, selectedLugar, selectedArtista, onFilterChange }) {
    const t = useTranslation();
    return (
        <div>
            <div style={{ marginBottom: '10px' }}>
                <label>{t.filterCity}</label>
                <select value={selectedLugar} onChange={(e) => onFilterChange(e.target.value, selectedArtista)}>
                    {lugares.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label>{t.filterArtist} </label>
                <select value={selectedArtista} onChange={(e) => onFilterChange(selectedLugar, e.target.value)}>
                    {artistas.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
            </div>
        </div>
    );
}

export default FilterBar;
