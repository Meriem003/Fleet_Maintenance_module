# Palette de Couleurs - Thème Professionnel Automobile

## Couleurs Principales

### Gris Slate (Couleur Corporate)
```css
slate-50:  #f8fafc  /* Arrière-plans très clairs */
slate-100: #f1f5f9  /* Arrière-plans clairs */
slate-200: #e2e8f0  /* Bordures subtiles */
slate-300: #cbd5e1  /* Bordures visibles */
slate-400: #94a3b8  /* Texte secondaire */
slate-500: #64748b  /* Texte normal */
slate-600: #475569  /* Texte important */
slate-700: #334155  /* Couleur principale (boutons, icônes) */
slate-800: #1e293b  /* Texte très important */
slate-900: #0f172a  /* Noir corporate */
```

### Gris Neutre (Textes et Éléments)
```css
gray-50:  #f9fafb  /* Arrière-plan page */
gray-100: #f3f4f6  /* Hover subtil */
gray-200: #e5e7eb  /* Bordures */
gray-300: #d1d5db  /* Bordures marquées */
gray-400: #9ca3af  /* Texte désactivé */
gray-500: #6b7280  /* Texte secondaire */
gray-600: #4b5563  /* Texte standard */
gray-700: #374151  /* Texte important */
gray-800: #1f2937  /* Titres */
gray-900: #111827  /* Noir texte */
```

### Couleurs d'Accent

#### Orange Mécanique (Alertes et CTA)
```css
orange-500: #f97316  /* Orange vif */
orange-600: #ea580c  /* Orange foncé */
red-500:    #ef4444  /* Rouge urgent */
red-600:    #dc2626  /* Rouge foncé */
```

#### Vert Succès
```css
emerald-500: #10b981  /* Succès */
emerald-600: #059669  /* Succès hover */
green-500:   #22c55e  /* Succès clair */
```

## Usage par Composant

### Boutons
- **Principal** : `bg-gradient-to-r from-slate-700 to-slate-900`
- **Secondaire** : `bg-white border-gray-300`
- **Danger** : `bg-gradient-to-r from-red-500 to-rose-600`
- **Succès** : `bg-gradient-to-r from-emerald-500 to-teal-600`

### Cartes
- **Arrière-plan** : `bg-white`
- **Bordure** : `border-gray-300`
- **Ombre** : `shadow-md`
- **Hover** : `shadow-lg`

### Textes
- **Titre principal** : `text-gray-900`
- **Sous-titre** : `text-gray-600`
- **Corps de texte** : `text-gray-700`
- **Texte désactivé** : `text-gray-400`

### Icônes
- **Logo principal** : `bg-gradient-to-br from-slate-700 to-slate-900`
- **Icônes d'action** : `text-white` (sur fond coloré)
- **Icônes secondaires** : `text-gray-500`

### Statuts
- **Actif** : `text-emerald-600`, `bg-emerald-50`
- **Inactif** : `text-gray-600`, `bg-gray-100`
- **Alerte** : `text-red-600`, `bg-red-50`
- **Maintenance** : `text-orange-600`, `bg-orange-50`

### Arrière-plans de Page
```css
/* Dégradé principal */
bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100

/* Page login */
bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100
```

### Animations et Effets
- **Hover cards** : `hover:shadow-xl`
- **Active buttons** : `active:scale-95`
- **Transition** : `transition-all duration-200`

## Contrastes et Accessibilité

### Ratios de Contraste (WCAG AA)
- Texte normal : Minimum 4.5:1
- Texte large : Minimum 3:1
- Éléments graphiques : Minimum 3:1

### Combinaisons Validées
✓ `text-gray-900` sur `bg-white` - Ratio 18.2:1
✓ `text-gray-700` sur `bg-white` - Ratio 9.8:1
✓ `text-gray-600` sur `bg-white` - Ratio 7.2:1
✓ `text-white` sur `bg-slate-700` - Ratio 8.6:1

## Export pour Design Systems

### Tailwind Config
```javascript
colors: {
  primary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  automotive: {
    orange: '#ff6b35',
    darkGray: '#2d3142',
    lightGray: '#4f5d75',
    steel: '#bfc0c0',
    white: '#ffffff',
  },
}
```

### CSS Variables
```css
:root {
  --color-primary: #334155;
  --color-primary-dark: #1e293b;
  --color-text: #111827;
  --color-text-secondary: #6b7280;
  --color-border: #d1d5db;
  --color-bg: #f9fafb;
  --color-white: #ffffff;
  --color-accent: #ff6b35;
  --color-success: #10b981;
  --color-danger: #ef4444;
}
```

## Notes de Design

1. **Cohérence** : Utiliser toujours slate-700/900 pour les éléments corporate
2. **Lisibilité** : Privilégier gray-900 pour les textes importants
3. **Hiérarchie** : Varier l'opacité plutôt que les couleurs
4. **Accessibilité** : Vérifier les contrastes avec les outils WCAG
5. **Performance** : Limiter les gradients complexes

---

**Thème** : Professionnel Automobile & Mécanique
**Version** : 1.0.0
**Dernière mise à jour** : Décembre 2024
