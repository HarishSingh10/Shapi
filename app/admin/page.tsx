'use client';

import React from 'react';
import { useFestival } from '@/components/FestivalContext';
import { 
  Settings, 
  Package, 
  Users, 
  Calendar, 
  Zap, 
  CheckCircle2, 
  Circle,
  Sparkles,
  LayoutDashboard,
  Trash2,
  ExternalLink,
  LogOut,
  Search,
  Filter,
  AlertCircle,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const { activeFestival, setFestival, announcementText, updateAnnouncement, saveSettings } = useFestival();
  const [activeTab, setActiveTab] = React.useState<'dashboard' | 'products'>('dashboard');
  const [products, setProducts] = React.useState<any[]>([]);
  const [isAddingProduct, setIsAddingProduct] = React.useState(false);
  const [newProduct, setNewProduct] = React.useState({
    name: '',
    price: 0,
    originalPrice: 0,
    category: 'automotive',
    description: '',
    image: '',
    stock: 10
  });

  const [searchQuery, setSearchQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<'all' | 'in-stock' | 'out-of-stock'>('all');
  const [categoryFilter, setCategoryFilter] = React.useState('all');
  const [deletingId, setDeletingId] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(Array.isArray(data) ? data : []));
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      const data = await res.json();
      setProducts([data, ...products]);
      setIsAddingProduct(false);
      setNewProduct({ name: '', price: 0, originalPrice: 0, category: 'automotive', description: '', image: '', stock: 10 });
    } catch (err) {
      console.error('Failed to add product:', err);
    }
  };

  const handleDeleteProduct = async (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    try {
      console.log('CLIENT: Master deleting product:', id);
      
      const res = await fetch('/api/products/master-delete', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: id })
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        setProducts(prev => prev.filter(p => p._id !== id));
        setDeletingId(null);
      } else {
        console.error(`DATABASE ERROR: ${data.error || 'Request failed'}`);
      }
    } catch (err: any) {
      console.error('NETWORK ERROR:', err);
    }
  };

  const handleUpdateStock = async (id: string, newStock: number) => {
    try {
      const res = await fetch('/api/products', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, stock: newStock }),
      });
      if (res.ok) {
        const updated = await res.json();
        setProducts(products.map(p => p._id === id ? updated : p));
      }
    } catch (err) {
      console.error('Failed to update stock:', err);
    }
  };

  const festivalOptions = [
    { id: 'none', label: 'None (Default)', icon: Circle, color: 'text-gray-400' },
    { id: 'diwali', label: 'Diwali', icon: Sparkles, color: 'text-yellow-500' },
    { id: 'holi', label: 'Holi', icon: Zap, color: 'text-pink-500' },
    { id: 'christmas', label: 'Christmas', icon: Calendar, color: 'text-red-500' },
    { id: 'new-year', label: 'New Year', icon: LayoutDashboard, color: 'text-blue-400' },
  ];

  const adminCategories = ['automotive', 'home-care', 'self-defense', 'mens-grooming'];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' ? true : 
                         statusFilter === 'in-stock' ? p.stock > 0 : p.stock === 0;
    const matchesCategory = categoryFilter === 'all' ? true : p.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-black border-r border-white/5 p-6 space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#D4AF37] rounded-lg flex items-center justify-center">
            <Settings className="w-5 h-5 text-black" />
          </div>
          <span className="font-bold tracking-wider text-sm text-[#D4AF37]">SAPI'S ADMIN</span>
        </div>

        <nav className="space-y-4">
          <div className="space-y-2">
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] px-4">Management</p>
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'dashboard' ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20' : 'text-gray-400 hover:bg-white/5'}`}
            >
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'products' ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20' : 'text-gray-400 hover:bg-white/5'}`}
            >
              <Package className="w-4 h-4" /> Products
            </button>
          </div>

          <div className="pt-8 space-y-2 border-t border-white/5">
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] px-4">System</p>
            <button 
              onClick={async () => {
                await fetch('/api/admin/logout', { method: 'POST' });
                router.push('/admin/login');
                router.refresh();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 transition-all"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold font-serif">
              {activeTab === 'dashboard' ? 'Admin Overview' : 'Product Inventory'}
            </h1>
            <p className="text-gray-500 text-sm mt-1">Manage your premium e-commerce experience.</p>
          </div>
          <div className="flex gap-4">
             <Link href="/" target="_blank" className="px-6 py-2 border border-[#D4AF37] text-[#D4AF37] rounded-lg text-xs font-bold hover:bg-[#D4AF37] hover:text-black transition-all">
               VIEW STOREFRONT
             </Link>
          </div>
        </header>

        {activeTab === 'dashboard' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quick Stats */}
            <div className="bg-white/5 rounded-3xl p-8 border border-white/5 h-fit">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Package className="w-5 h-5 text-[#D4AF37]" /> Inventory Summary
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/40 p-5 rounded-2xl border border-white/5">
                  <span className="text-gray-500 text-xs uppercase tracking-widest">Total Products</span>
                  <p className="text-2xl font-bold mt-1">{products.length}</p>
                </div>
                <div className="bg-black/40 p-5 rounded-2xl border border-white/5">
                  <span className="text-gray-500 text-xs uppercase tracking-widest">Active Orders</span>
                  <p className="text-2xl font-bold mt-1">0</p>
                </div>
              </div>
            </div>

            {/* FESTIVAL CONTROL */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-white/5 to-transparent rounded-3xl p-8 border border-white/5 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#D4AF37]" /> Festival Engine
                  </h3>
                  <div className="px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full text-[10px] font-bold uppercase tracking-widest">
                    Dynamic UI Active
                  </div>
                </div>

                <div className="space-y-3">
                  {festivalOptions.map((fest) => {
                    const Icon = fest.icon;
                    const isActive = activeFestival === fest.id;
                    return (
                      <button
                        key={fest.id}
                        onClick={() => setFestival(fest.id as any)}
                        className={`w-full group flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 ${
                          isActive 
                            ? 'bg-[#D4AF37] border-[#D4AF37] text-black shadow-[0_0_30px_rgba(212,175,55,0.3)]' 
                            : 'bg-black border-white/5 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg ${isActive ? 'bg-black/10' : 'bg-white/5 group-hover:bg-white/10 transition-colors'}`}>
                            <Icon className={`w-5 h-5 ${isActive ? 'text-black' : fest.color}`} />
                          </div>
                          <div className="text-left">
                            <span className="font-bold text-sm block">{fest.label}</span>
                            {!isActive && <span className="text-[10px] text-gray-500 uppercase tracking-widest">Switch to theme</span>}
                          </div>
                        </div>
                        {isActive ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <span className="w-5 h-5 rounded-full border border-white/10 group-hover:border-[#D4AF37]/50" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ANNOUNCEMENT EDITOR */}
              <div className="bg-white/5 rounded-3xl p-8 border border-white/5">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#D4AF37]" /> Announcement Banner
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500">Marquee Text</label>
                    <textarea 
                      className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm focus:border-[#D4AF37] outline-none min-h-[80px]"
                      value={announcementText}
                      onChange={(e) => updateAnnouncement(e.target.value)}
                      placeholder="Enter the moving text here..."
                    />
                  </div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">Note: This text scrolls infinitely at the top of the website.</p>
                </div>
              </div>

              {/* SAVE CONFIGURATION BUTTON */}
              <div className="bg-gradient-to-r from-[#D4AF37]/20 to-transparent p-1 rounded-2xl">
                <button 
                  onClick={() => saveSettings()}
                  className="w-full bg-[#D4AF37] text-black py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5" /> SAVE GLOBAL CONFIGURATION
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <h2 className="text-xl font-bold whitespace-nowrap">Manage Products ({filteredProducts.length})</h2>
              
              <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
                {/* Search Engine */}
                <div className="relative flex-1 min-w-[240px]">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  <input 
                    type="text" 
                    placeholder="Search name or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-black border border-white/5 rounded-xl py-2.5 pl-11 pr-4 text-xs text-white focus:border-[#D4AF37]/50 outline-none transition-all"
                  />
                </div>

                {/* Status Filter */}
                <div className="flex items-center bg-black border border-white/5 rounded-xl p-1">
                  {(['all', 'in-stock', 'out-of-stock'] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                        statusFilter === status ? 'bg-[#D4AF37] text-black' : 'text-white/40 hover:text-white'
                      }`}
                    >
                      {status.replace('-', ' ')}
                    </button>
                  ))}
                </div>

                {/* Category Dropdown */}
                <select 
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="bg-black border border-white/5 rounded-xl px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] outline-none cursor-pointer hover:border-[#D4AF37]/30 transition-all"
                >
                  <option value="all">All Categories</option>
                  {adminCategories.map(cat => (
                    <option key={cat} value={cat}>{cat.replace('-', ' ')}</option>
                  ))}
                </select>

                <button 
                  onClick={() => setIsAddingProduct(true)}
                  className="bg-gradient-to-r from-[#D4AF37] to-[#F4CF57] text-black px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all"
                >
                  + ADD PRODUCT
                </button>
              </div>
            </div>

            {isAddingProduct && (
              <div className="bg-white/5 p-8 rounded-3xl border border-[#D4AF37]/30">
                <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-[10px] uppercase tracking-widest text-gray-500">Product Name</label>
                     <input 
                       className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm focus:border-[#D4AF37] outline-none"
                       value={newProduct.name}
                       onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                       required
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] uppercase tracking-widest text-gray-500">Category</label>
                     <select 
                       className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm focus:border-[#D4AF37] outline-none text-white"
                       value={newProduct.category}
                       onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                     >
                       <option value="automotive">Automotive</option>
                       <option value="home-care">Home Care</option>
                       <option value="self-defense">Self Defense</option>
                       <option value="mens-grooming">Men's Grooming</option>
                     </select>
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] uppercase tracking-widest text-gray-500">Sale Price (₹)</label>
                     <input 
                       type="number"
                       className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm focus:border-[#D4AF37] outline-none"
                       value={newProduct.price}
                       onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
                       required
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] uppercase tracking-widest text-gray-500">Original Price (₹)</label>
                     <input 
                       type="number"
                       className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm focus:border-[#D4AF37] outline-none"
                       value={newProduct.originalPrice}
                       onChange={e => setNewProduct({...newProduct, originalPrice: Number(e.target.value)})}
                       required
                     />
                   </div>
                   <div className="md:col-span-2 space-y-4">
                     <div className="flex flex-col md:flex-row gap-6">
                       <div className="flex-1 space-y-2">
                         <label className="text-[10px] uppercase tracking-widest text-gray-500">Image URL</label>
                         <input 
                           className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm focus:border-[#D4AF37] outline-none"
                           value={newProduct.image}
                           onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                           placeholder="https://..."
                         />
                       </div>
                       <div className="flex-1 space-y-2">
                         <label className="text-[10px] uppercase tracking-widest text-gray-500">Or Upload File</label>
                         <div className="relative h-[53px] group">
                           <input 
                             type="file"
                             accept="image/*"
                             onChange={handleFileUpload}
                             className="absolute inset-0 opacity-0 cursor-pointer z-10"
                           />
                           <div className="w-full h-full bg-black border border-white/10 border-dashed rounded-xl flex items-center justify-center gap-2 group-hover:border-[#D4AF37]/50 transition-all">
                             <Upload className="w-4 h-4 text-white/20 group-hover:text-[#D4AF37]" />
                             <span className="text-[10px] uppercase tracking-widest text-white/40 group-hover:text-[#D4AF37]">Click to upload</span>
                           </div>
                         </div>
                       </div>
                     </div>
                     {newProduct.image && (
                       <div className="h-40 w-40 rounded-xl overflow-hidden border border-white/10 bg-black relative group">
                          <img src={newProduct.image} alt="Preview" className="w-full h-full object-cover opacity-80" />
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Preview</span>
                          </div>
                          <button 
                            type="button"
                            onClick={() => setNewProduct({...newProduct, image: ''})}
                            className="absolute top-2 right-2 p-2 bg-black/80 rounded-lg text-red-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                       </div>
                     )}
                   </div>
                   <div className="md:col-span-2 space-y-2">
                     <label className="text-[10px] uppercase tracking-widest text-gray-500">Description</label>
                     <textarea 
                       className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm focus:border-[#D4AF37] outline-none min-h-[100px]"
                       value={newProduct.description}
                       onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                       required
                     />
                   </div>
                   <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                     <button type="button" onClick={() => setIsAddingProduct(false)} className="text-gray-500 text-xs font-bold px-6">CANCEL</button>
                     <button type="submit" className="bg-[#D4AF37] text-black px-10 py-4 rounded-xl text-xs font-bold">SAVE PRODUCT</button>
                   </div>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <div key={product._id} className="bg-white/5 border border-white/5 rounded-3xl p-6 group hover:border-[#D4AF37]/20 transition-all relative">
                  <div className="absolute top-4 right-4 z-[100] flex gap-2 pointer-events-auto">
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (deletingId === product._id) {
                          handleDeleteProduct(product._id);
                        } else {
                          setDeletingId(product._id);
                          setTimeout(() => setDeletingId(null), 3000);
                        }
                      }}
                      className={`p-3 text-white rounded-xl transition-all shadow-2xl flex items-center justify-center cursor-pointer active:scale-90 ${deletingId === product._id ? 'bg-red-800 outline outline-2 outline-white shadow-[0_0_20px_red] px-4' : 'bg-red-600 hover:bg-red-700'}`}
                      title="Delete Product"
                    >
                      {deletingId === product._id ? (
                        <span className="text-[10px] font-black tracking-widest uppercase">Confirm?</span>
                      ) : (
                        <Trash2 className="w-5 h-5 pointer-events-none" />
                      )}
                    </button>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.open(`/products/${product.slug}`, '_blank');
                      }}
                      className="p-3 bg-black/80 text-white border border-white/10 rounded-xl hover:bg-[#D4AF37] hover:text-black transition-all shadow-2xl flex items-center justify-center cursor-pointer active:scale-90"
                      title="View Details"
                    >
                      <ExternalLink className="w-5 h-5 pointer-events-none" />
                    </button>
                  </div>
                    <div className="aspect-square relative rounded-2xl overflow-hidden mb-4 bg-black">
                      <img src={product.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500" />
                    </div>
                    <h4 className="font-bold text-sm line-clamp-1">{product.name}</h4>
                    
                    {/* Stock Management */}
                    <div className="mt-4 flex items-center justify-between bg-black/40 p-3 rounded-xl border border-white/5">
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold mb-1">Inventory</span>
                        <div className="flex items-center gap-2">
                          <input 
                            type="number" 
                            min="0"
                            value={product.stock}
                            onChange={(e) => handleUpdateStock(product._id, Number(e.target.value))}
                            className="w-16 bg-black border border-white/10 rounded-lg px-2 py-1 text-xs font-bold focus:border-[#D4AF37] outline-none"
                          />
                          {product.stock === 0 && (
                            <span className="text-[10px] text-red-500 font-black uppercase tracking-tighter">OUT!</span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold mb-1 block">Status</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${product.stock > 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                          {product.stock > 0 ? 'AVAILABLE' : 'SOLD OUT'}
                        </span>
                      </div>
                    </div>
  
                    <div className="flex justify-between items-center mt-4 pt-2 border-t border-white/5">
                      <div className="flex flex-col">
                        <span className="text-[#D4AF37] font-bold">₹{product.price}</span>
                        <span className="text-[10px] text-gray-500 line-through">₹{product.originalPrice}</span>
                      </div>
                      <span className="text-[10px] text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-1 rounded font-bold uppercase tracking-wider">{product.category}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-20 bg-white/5 border border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center text-center">
                  <AlertCircle className="w-12 h-12 text-white/10 mb-4" />
                  <p className="text-white/40 uppercase tracking-[0.2em] font-bold text-xs">No matching products found</p>
                  <button 
                    onClick={() => { setSearchQuery(''); setStatusFilter('all'); setCategoryFilter('all'); }}
                    className="mt-6 text-[#D4AF37] text-[10px] font-black uppercase tracking-widest hover:underline"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
