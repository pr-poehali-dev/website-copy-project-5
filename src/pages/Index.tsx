import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Автоматический выключатель ВА47-29 1Р 16А',
    category: 'Автоматы',
    brand: 'IEK',
    price: 245,
    image: 'https://cdn.poehali.dev/projects/37be30e9-855a-40dd-8c0c-a2046ed25616/files/962b5f28-0d8a-4c0f-abd6-1f14573da0a1.jpg',
    voltage: '230В',
    current: '16А',
    poles: '1P'
  },
  {
    id: 2,
    name: 'Кабель ВВГ-П 3x2.5 мм²',
    category: 'Кабели',
    brand: 'Камкабель',
    price: 85,
    image: 'https://cdn.poehali.dev/projects/37be30e9-855a-40dd-8c0c-a2046ed25616/files/b0bc8a6d-fa98-4387-a723-d80f2cb9d342.jpg',
    voltage: '660В',
    section: '2.5 мм²',
    cores: '3'
  },
  {
    id: 3,
    name: 'Розетка двойная с заземлением',
    category: 'Розетки',
    brand: 'Legrand',
    price: 320,
    image: 'https://cdn.poehali.dev/projects/37be30e9-855a-40dd-8c0c-a2046ed25616/files/576b5d6c-c0f8-4d8f-8007-e851732fdb89.jpg',
    voltage: '230В',
    current: '16А',
    ip: 'IP20'
  },
  {
    id: 4,
    name: 'Светильник LED 36W встраиваемый',
    category: 'Светильники',
    brand: 'Gauss',
    price: 1250,
    image: 'https://cdn.poehali.dev/projects/37be30e9-855a-40dd-8c0c-a2046ed25616/files/962b5f28-0d8a-4c0f-abd6-1f14573da0a1.jpg',
    power: '36Вт',
    color: '4000K',
    lumens: '2880лм'
  },
  {
    id: 5,
    name: 'Щит распределительный ЩРН-12',
    category: 'Щиты',
    brand: 'IEK',
    price: 890,
    image: 'https://cdn.poehali.dev/projects/37be30e9-855a-40dd-8c0c-a2046ed25616/files/962b5f28-0d8a-4c0f-abd6-1f14573da0a1.jpg',
    modules: '12',
    ip: 'IP40',
    material: 'Пластик'
  },
  {
    id: 6,
    name: 'УЗО ВД1-63 2Р 40А 30мА',
    category: 'УЗО',
    brand: 'IEK',
    price: 1150,
    image: 'https://cdn.poehali.dev/projects/37be30e9-855a-40dd-8c0c-a2046ed25616/files/962b5f28-0d8a-4c0f-abd6-1f14573da0a1.jpg',
    current: '40А',
    sensitivity: '30мА',
    poles: '2P'
  },
  {
    id: 7,
    name: 'Выключатель одноклавишный',
    category: 'Выключатели',
    brand: 'Schneider Electric',
    price: 180,
    image: 'https://cdn.poehali.dev/projects/37be30e9-855a-40dd-8c0c-a2046ed25616/files/576b5d6c-c0f8-4d8f-8007-e851732fdb89.jpg',
    voltage: '230В',
    current: '10А',
    ip: 'IP20'
  },
  {
    id: 8,
    name: 'Гофра ПНД 20мм серая',
    category: 'Гофра',
    brand: 'Рувинил',
    price: 28,
    image: 'https://cdn.poehali.dev/projects/37be30e9-855a-40dd-8c0c-a2046ed25616/files/b0bc8a6d-fa98-4387-a723-d80f2cb9d342.jpg',
    diameter: '20мм',
    material: 'ПНД',
    length: '1м'
  }
];

const CATEGORIES = ['Все товары', 'Автоматы', 'Кабели', 'Розетки', 'Светильники', 'Щиты', 'УЗО', 'Выключатели', 'Гофра'];
const BRANDS = ['IEK', 'Legrand', 'Schneider Electric', 'Gauss', 'Камкабель', 'Рувинил'];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState('Все товары');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });

  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === 'Все товары' || product.category === selectedCategory;
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
    return matchesCategory && matchesBrand && matchesSearch && matchesPrice;
  });

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <Icon name="Zap" size={32} className="text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-secondary">ВОЛГО-ДОН</h1>
                <p className="text-xs text-muted-foreground">Электротехническая продукция</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Главная</a>
              <a href="#catalog" className="text-sm font-medium hover:text-primary transition-colors">Каталог</a>
              <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">О компании</a>
              <a href="#delivery" className="text-sm font-medium hover:text-primary transition-colors">Доставка</a>
              <a href="#services" className="text-sm font-medium hover:text-primary transition-colors">Услуги</a>
              <a href="#blog" className="text-sm font-medium hover:text-primary transition-colors">Блог</a>
              <a href="#contacts" className="text-sm font-medium hover:text-primary transition-colors">Контакты</a>
            </nav>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                <Icon name="Phone" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Icon name="Menu" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-br from-primary/10 to-secondary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Электротехническое оборудование для профессионалов</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Широкий ассортимент качественной продукции от ведущих производителей. Доставка по всей России.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="gap-2">
                <Icon name="ShoppingCart" size={20} />
                Перейти в каталог
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Icon name="FileText" size={20} />
                Получить прайс-лист
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h3 className="text-3xl font-bold mb-4">Каталог товаров</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Поиск по названию, категории, характеристикам..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="gap-2 md:hidden">
                    <Icon name="SlidersHorizontal" size={20} />
                    Фильтры
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Фильтры</SheetTitle>
                  </SheetHeader>
                  <FilterContent 
                    brands={BRANDS}
                    selectedBrands={selectedBrands}
                    toggleBrand={toggleBrand}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                  />
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <div className="flex gap-6">
            <aside className="hidden md:block w-64 flex-shrink-0">
              <Card>
                <CardHeader>
                  <CardTitle>Фильтры</CardTitle>
                </CardHeader>
                <CardContent>
                  <FilterContent 
                    brands={BRANDS}
                    selectedBrands={selectedBrands}
                    toggleBrand={toggleBrand}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                  />
                </CardContent>
              </Card>
            </aside>

            <div className="flex-1">
              <div className="mb-6">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {CATEGORIES.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="whitespace-nowrap"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Найдено товаров: <span className="font-semibold text-foreground">{filteredProducts.length}</span>
                </p>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Icon name="ArrowUpDown" size={16} />
                  Сортировка
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <Card key={product.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <Badge className="w-fit mb-2">{product.category}</Badge>
                      <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                      <CardDescription className="text-sm">{product.brand}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1 text-sm">
                        {Object.entries(product).map(([key, value]) => {
                          if (['id', 'name', 'category', 'brand', 'price', 'image'].includes(key)) return null;
                          return (
                            <div key={key} className="flex justify-between">
                              <span className="text-muted-foreground capitalize">{key}:</span>
                              <span className="font-medium">{value}</span>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <div>
                        <p className="text-2xl font-bold text-primary">{product.price} ₽</p>
                      </div>
                      <Button size="sm" className="gap-2">
                        <Icon name="ShoppingCart" size={16} />
                        В корзину
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">О компании</h3>
              <p className="text-muted-foreground mb-4">
                Компания "Волго-Дон Электро" — надежный поставщик электротехнической продукции на российском рынке с 2010 года.
              </p>
              <p className="text-muted-foreground mb-6">
                Мы предлагаем широкий ассортимент качественного оборудования от ведущих производителей: кабели, автоматы, светильники, электроустановочные изделия и многое другое.
              </p>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-3xl font-bold text-primary">15+</p>
                  <p className="text-sm text-muted-foreground">лет на рынке</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">10К+</p>
                  <p className="text-sm text-muted-foreground">товаров</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">5000+</p>
                  <p className="text-sm text-muted-foreground">клиентов</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/5 rounded-lg p-8 flex items-center justify-center h-96">
              <Icon name="Building2" size={120} className="text-primary/30" />
            </div>
          </div>
        </div>
      </section>

      <section id="delivery" className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-8 text-center">Доставка и оплата</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Icon name="Truck" size={48} className="text-primary mb-4" />
                <CardTitle>Доставка по России</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Отправляем товар транспортными компаниями по всей территории РФ. Сроки доставки 2-7 дней.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Icon name="MapPin" size={48} className="text-primary mb-4" />
                <CardTitle>Самовывоз</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Забрать заказ можно со склада в Волгограде. Работаем без выходных с 9:00 до 18:00.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Icon name="CreditCard" size={48} className="text-primary mb-4" />
                <CardTitle>Удобная оплата</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Принимаем оплату наличными, картой, безналичный расчет для юридических лиц.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-8 text-center">Наши услуги</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'Wrench', title: 'Монтаж оборудования', desc: 'Профессиональная установка электрооборудования' },
              { icon: 'FileSearch', title: 'Консультации', desc: 'Помощь в подборе оборудования под задачу' },
              { icon: 'Calculator', title: 'Расчет проектов', desc: 'Составление смет и технических заданий' },
              { icon: 'Headphones', title: 'Техподдержка', desc: 'Консультации по эксплуатации оборудования' }
            ].map((service, idx) => (
              <Card key={idx} className="text-center">
                <CardHeader>
                  <Icon name={service.icon as any} size={48} className="text-primary mx-auto mb-4" />
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-8 text-center">Полезные статьи</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Как выбрать автоматический выключатель', date: '15 декабря 2024' },
              { title: 'Расчет сечения кабеля по мощности', date: '10 декабря 2024' },
              { title: 'Установка УЗО: пошаговая инструкция', date: '5 декабря 2024' }
            ].map((article, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/5 rounded-lg mb-4 flex items-center justify-center">
                    <Icon name="FileText" size={48} className="text-primary/50" />
                  </div>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Icon name="Calendar" size={14} />
                    {article.date}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-bold mb-6">Контакты</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Icon name="MapPin" size={24} className="text-primary mt-1" />
                  <div>
                    <p className="font-medium">Адрес склада</p>
                    <p className="text-white/80">г. Волгоград, ул. Электротехническая, д. 25</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Phone" size={24} className="text-primary mt-1" />
                  <div>
                    <p className="font-medium">Телефон</p>
                    <p className="text-white/80">+7 (8442) 123-45-67</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Mail" size={24} className="text-primary mt-1" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-white/80">info@volgo-don-electro.ru</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Clock" size={24} className="text-primary mt-1" />
                  <div>
                    <p className="font-medium">Режим работы</p>
                    <p className="text-white/80">Пн-Вс: 9:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Связаться с нами</CardTitle>
                  <CardDescription>Оставьте заявку, и мы свяжемся с вами в ближайшее время</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input placeholder="Ваше имя" />
                  <Input placeholder="Телефон" />
                  <Input placeholder="Email" />
                  <Button className="w-full">Отправить заявку</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-secondary/95 text-white/60 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">© 2024 Волго-Дон Электро. Все права защищены.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-white transition-colors">Условия использования</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FilterContent({ 
  brands, 
  selectedBrands, 
  toggleBrand,
  priceRange,
  setPriceRange
}: {
  brands: string[];
  selectedBrands: string[];
  toggleBrand: (brand: string) => void;
  priceRange: { min: number; max: number };
  setPriceRange: (range: { min: number; max: number }) => void;
}) {
  return (
    <Accordion type="multiple" defaultValue={['brands', 'price']} className="w-full">
      <AccordionItem value="brands">
        <AccordionTrigger>Производители</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3">
            {brands.map(brand => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={brand}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={() => toggleBrand(brand)}
                />
                <label htmlFor={brand} className="text-sm cursor-pointer">
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="price">
        <AccordionTrigger>Цена</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="От"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
              />
              <Input
                type="number"
                placeholder="До"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}