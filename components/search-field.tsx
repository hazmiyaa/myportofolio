import { Search, X } from "lucide-react"

interface SearchFieldProps {
  value: string
  label: string
  onChange: (value: string) => void
}

export default function SearchField({ value, label, onChange }: SearchFieldProps) {
  return <div className="search-field">
    <Search size={16} aria-hidden="true"/>
    <input type="search" aria-label={label} placeholder={label} value={value} onChange={e=>onChange(e.target.value)}/>
    {value && <button type="button" aria-label="Hapus pencarian" onClick={()=>onChange("")}><X size={14}/></button>}
  </div>
}
