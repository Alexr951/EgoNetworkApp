# Ego-Network Builder

A modern web application for students to create and visualize ego-networks similar to the [KINMATRIX dataset](https://kinmatrix.eu/). This application allows users to build comprehensive family networks by inputting information about themselves and their family members, then visualizing the resulting network structure.

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd EgoNetworkApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to start using the application.

### Building for Production

```bash
npm run build
```

This creates a `dist` folder with the production-ready files.

## How to Use

### 1. Building Your Network

1. **Add Your Information**: Start by entering your name, age, and gender as the central node (ego)
2. **Add Family Members**: Click "Add Family Member" to add relatives
3. **Complete Information**: For each family member, provide:
   - Full name
   - Age
   - Gender
   - Relationship to you (select from categorized options)
4. **Review & Edit**: Use the list view to review, edit, or remove family members

### 2. Visualizing Your Network

1. **Switch to Visualization**: Click "View Network Visualization" when you have data
2. **Explore the Network**:
   - The center node represents you (ego)
   - Other nodes represent family members, color-coded by relationship
   - Lines show connections from you to each family member
3. **Interactive Features**:
   - Click any node to zoom in
   - Drag to pan around the network
   - Use controls to show/hide labels or reset the view
4. **Export Data**: Download your network data for further analysis

## Relationship Categories

The application supports comprehensive relationship types:

- **Immediate Family**: father, mother, son, daughter, brother, sister, husband, wife, spouse, partner
- **Extended Family**: grandfather, grandmother, uncle, aunt, cousin
- **In-Laws**: father-in-law, mother-in-law, brother-in-law, sister-in-law, son-in-law, daughter-in-law
- **Step Family**: stepfather, stepmother, stepson, stepdaughter, stepbrother, stepsister
- **Other**: adoptive parent, adopted child, foster parent, foster child, guardian, other relative

## Technical Details

### Built With
- **React 18**: Modern React with hooks and context
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **react-force-graph-2d**: Interactive network visualization
- **Lucide React**: Beautiful icons
- **Local Storage**: Data persistence in the browser

### Project Structure
```
src/
├── components/          # React components
│   ├── Header.jsx      # Navigation header
│   ├── NetworkBuilder.jsx      # Main builder interface
│   ├── EgoForm.jsx     # Ego information form
│   ├── FamilyMemberForm.jsx    # Family member form
│   ├── FamilyMemberList.jsx    # List of family members
│   └── NetworkVisualization.jsx # Network graph component
├── context/
│   └── NetworkContext.jsx      # React context for state management
├── App.jsx             # Main application component
├── main.jsx           # React entry point
└── index.css          # Global styles
```

## Educational Value

This application is designed for educational purposes, particularly for:

- **Social Network Analysis**: Understanding ego-network concepts
- **Family Studies**: Mapping family structures and relationships
- **Data Visualization**: Learning about network graphs and force-directed layouts
- **Research Methods**: Similar to the KINMATRIX dataset methodology

## Privacy & Data

- **Local Storage**: All data is stored locally in your browser
- **No Server**: No data is sent to external servers
- **Export Control**: You control when and how to export your data
- **Clear Data**: Option to clear all data at any time

## Contributing

This is an educational project. Feel free to:
- Report bugs or issues
- Suggest new features
- Improve the documentation
- Enhance the visualization capabilities

## License

MIT License - feel free to use this project for educational purposes.

## Acknowledgments

- Inspired by the [KINMATRIX dataset](https://kinmatrix.eu/) and research methodology
- Built with modern web technologies for educational purposes
- Designed for students learning about social network analysis and family studies

