function FilterBar({ lugares, artistas, selectedLugar, selectedArtista, onFilterChange }) {
    return (
        <div>
            <div style={{ marginBottom: '10px' }}>
                <label>Filtrar por ciudad: </label>
                <select value={selectedLugar} onChange={(e) => onFilterChange(e.target.value, selectedArtista)}>
                    {lugares.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label>Filtrar por artista: </label>
                <select value={selectedArtista} onChange={(e) => onFilterChange(selectedLugar, e.target.value)}>
                    {artistas.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
            </div>
        </div>
    );
}

export default FilterBar;
