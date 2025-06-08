import { useState } from 'react';
import { Search, Volume2, Heart, Star, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { glossarioData, categorias } from './data/glossario.js';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [favorites, setFavorites] = useState(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filtrar termos baseado na busca e categoria
  const filteredTerms = glossarioData.filter(term => {
    const matchesSearch = term.portugues.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.yanomami.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || term.categoria === selectedCategory;
    const matchesFavorites = !showFavoritesOnly || favorites.has(term.id);
    
    return matchesSearch && matchesCategory && matchesFavorites;
  });

  // Função para reproduzir áudio
  const playAudio = (audioUrl) => {
    try {
      const audio = new Audio(audioUrl);
      audio.play().catch(error => {
        console.error('Erro ao reproduzir áudio:', error);
        alert('Erro ao reproduzir o áudio. Verifique se o arquivo está disponível.');
      });
    } catch (error) {
      console.error('Erro ao criar objeto de áudio:', error);
      alert('Erro ao carregar o áudio.');
    }
  };

  // Função para alternar favoritos
  const toggleFavorite = (termId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(termId)) {
      newFavorites.delete(termId);
    } else {
      newFavorites.add(termId);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Heart className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Glossário Médico Yanomami</h1>
                <p className="text-sm text-gray-600 hidden sm:block">Comunicação em Saúde Indígena</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4">
              <Button
                variant={showFavoritesOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className="flex items-center space-x-2"
              >
                <Star className="h-4 w-4" />
                <span>Favoritos</span>
              </Button>
            </nav>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t px-4 py-3">
            <Button
              variant={showFavoritesOnly ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setShowFavoritesOnly(!showFavoritesOnly);
                setMobileMenuOpen(false);
              }}
              className="flex items-center space-x-2 w-full"
            >
              <Star className="h-4 w-4" />
              <span>Favoritos</span>
            </Button>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Buscar termos em português ou yanomami..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-lg h-12"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === '' ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory('')}
            >
              Todas as Categorias
            </Button>
            {categorias.map((categoria) => (
              <Button
                key={categoria}
                variant={selectedCategory === categoria ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(categoria)}
              >
                {categoria}
              </Button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {filteredTerms.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  {searchTerm || selectedCategory || showFavoritesOnly
                    ? "Nenhum termo encontrado com os filtros aplicados."
                    : "Carregando termos..."}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredTerms.map((term) => (
              <Card key={term.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl text-gray-900 mb-1">
                        {term.portugues}
                      </CardTitle>
                      <p className="text-2xl font-semibold text-green-700 mb-2">
                        {term.yanomami}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        {term.categoria}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleFavorite(term.id)}
                        className={favorites.has(term.id) ? "text-yellow-600" : ""}
                      >
                        <Star className={`h-4 w-4 ${favorites.has(term.id) ? "fill-current" : ""}`} />
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => playAudio(term.audioUrl)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Volume2 className="h-4 w-4 mr-2" />
                        Ouvir
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">{term.descricao}</p>
                  <p className="text-sm text-gray-500 italic">{term.contexto}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Statistics */}
        {filteredTerms.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Mostrando {filteredTerms.length} de {glossarioData.length} termos
              {showFavoritesOnly && ` • ${favorites.size} favoritos`}
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 mb-2">
              Glossário Médico Yanomami - Projeto PIT/Ebserh
            </p>
            <p className="text-sm text-gray-500">
              Desenvolvido para facilitar a comunicação entre profissionais de saúde e pacientes indígenas Yanomami
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

