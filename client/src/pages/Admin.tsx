import { useState, useEffect } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Edit2, Eye, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';

export default function Admin() {
  const { user, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('leads');

  const leadsQuery = trpc.admin.getLeads.useQuery(undefined, { enabled: isAuthenticated && user?.role === 'admin' });
  const auditsQuery = trpc.admin.getAudits.useQuery(undefined, { enabled: isAuthenticated && user?.role === 'admin' });
  const leadStatsQuery = trpc.admin.getLeadStats.useQuery(undefined, { enabled: isAuthenticated && user?.role === 'admin' });
  const auditStatsQuery = trpc.admin.getAuditStats.useQuery(undefined, { enabled: isAuthenticated && user?.role === 'admin' });

  const updateLeadStatusMutation = trpc.admin.updateLeadStatus.useMutation();
  const deleteLeadMutation = trpc.admin.deleteLead.useMutation();
  const updateAuditStatusMutation = trpc.admin.updateAuditStatus.useMutation();
  const deleteAuditMutation = trpc.admin.deleteAudit.useMutation();

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-background text-foreground pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Acesso Negado</h1>
          <p className="text-muted-foreground">Você não tem permissão para acessar esta página.</p>
        </div>
      </div>
    );
  }

  const handleUpdateLeadStatus = async (id: number, status: string) => {
    try {
      await updateLeadStatusMutation.mutateAsync({
        id,
        status: status as "new" | "contacted" | "qualified" | "converted" | "lost",
      });
      leadsQuery.refetch();
      toast.success('Status atualizado com sucesso');
    } catch (error) {
      toast.error('Erro ao atualizar status');
    }
  };

  const handleDeleteLead = async (id: number) => {
    if (confirm('Tem certeza que deseja deletar este lead?')) {
      try {
        await deleteLeadMutation.mutateAsync({ id });
        leadsQuery.refetch();
        toast.success('Lead deletado com sucesso');
      } catch (error) {
        toast.error('Erro ao deletar lead');
      }
    }
  };

  const handleUpdateAuditStatus = async (id: number, status: string) => {
    try {
      await updateAuditStatusMutation.mutateAsync({
        id,
        status: status as "pending" | "in_progress" | "completed" | "cancelled",
      });
      auditsQuery.refetch();
      toast.success('Status atualizado com sucesso');
    } catch (error) {
      toast.error('Erro ao atualizar status');
    }
  };

  const handleDeleteAudit = async (id: number) => {
    if (confirm('Tem certeza que deseja deletar esta auditoria?')) {
      try {
        await deleteAuditMutation.mutateAsync({ id });
        auditsQuery.refetch();
        toast.success('Auditoria deletada com sucesso');
      } catch (error) {
        toast.error('Erro ao deletar auditoria');
      }
    }
  };

  const filteredLeads = leadsQuery.data?.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.whatsapp.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  }) || [];

  const filteredAudits = auditsQuery.data?.filter(audit => {
    const matchesSearch = audit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      audit.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      audit.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || audit.status === statusFilter;
    return matchesSearch && matchesStatus;
  }) || [];

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <section className="py-8 bg-gradient-to-b from-card/50 to-background border-b border-border">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Painel de Administração</h1>
          <p className="text-muted-foreground">Gerencie leads e auditorias capturados</p>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="leads">Leads ({leadsQuery.data?.length || 0})</TabsTrigger>
              <TabsTrigger value="audits">Auditorias ({auditsQuery.data?.length || 0})</TabsTrigger>
            </TabsList>

            <TabsContent value="leads" className="space-y-6">
              {/* Stats */}
              {leadStatsQuery.data && (
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  <div className="p-4 rounded-lg bg-card border border-border">
                    <div className="text-2xl font-bold text-accent">{leadStatsQuery.data.total}</div>
                    <div className="text-sm text-muted-foreground">Total</div>
                  </div>
                  <div className="p-4 rounded-lg bg-card border border-border">
                    <div className="text-2xl font-bold">{leadStatsQuery.data.new}</div>
                    <div className="text-sm text-muted-foreground">Novos</div>
                  </div>
                  <div className="p-4 rounded-lg bg-card border border-border">
                    <div className="text-2xl font-bold">{leadStatsQuery.data.contacted}</div>
                    <div className="text-sm text-muted-foreground">Contatados</div>
                  </div>
                  <div className="p-4 rounded-lg bg-card border border-border">
                    <div className="text-2xl font-bold">{leadStatsQuery.data.qualified}</div>
                    <div className="text-sm text-muted-foreground">Qualificados</div>
                  </div>
                  <div className="p-4 rounded-lg bg-card border border-border">
                    <div className="text-2xl font-bold text-green-500">{leadStatsQuery.data.converted}</div>
                    <div className="text-sm text-muted-foreground">Convertidos</div>
                  </div>
                  <div className="p-4 rounded-lg bg-card border border-border">
                    <div className="text-2xl font-bold">{leadStatsQuery.data.conversionRate}%</div>
                    <div className="text-sm text-muted-foreground">Taxa Conversão</div>
                  </div>
                </div>
              )}

              {/* Filters */}
              <div className="flex gap-4 flex-col md:flex-row">
                <Input
                  placeholder="Buscar por nome, email ou WhatsApp..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filtrar por status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="new">Novo</SelectItem>
                    <SelectItem value="contacted">Contatado</SelectItem>
                    <SelectItem value="qualified">Qualificado</SelectItem>
                    <SelectItem value="converted">Convertido</SelectItem>
                    <SelectItem value="lost">Perdido</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full">
                  <thead className="bg-card/50 border-b border-border">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Nome</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">WhatsApp</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Empresa</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="border-b border-border hover:bg-card/30 transition-colors">
                        <td className="px-6 py-4 text-sm">{lead.name}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{lead.email}</td>
                        <td className="px-6 py-4 text-sm">{lead.whatsapp}</td>
                        <td className="px-6 py-4 text-sm">{lead.company || '-'}</td>
                        <td className="px-6 py-4 text-sm">
                          <Select value={lead.status || 'new'} onValueChange={(status) => handleUpdateLeadStatus(lead.id, status)}>
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">Novo</SelectItem>
                              <SelectItem value="contacted">Contatado</SelectItem>
                              <SelectItem value="qualified">Qualificado</SelectItem>
                              <SelectItem value="converted">Convertido</SelectItem>
                              <SelectItem value="lost">Perdido</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="text-red-500 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="audits" className="space-y-6">
              {/* Stats */}
              {auditStatsQuery.data && (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="p-4 rounded-lg bg-card border border-border">
                    <div className="text-2xl font-bold text-accent">{auditStatsQuery.data.total}</div>
                    <div className="text-sm text-muted-foreground">Total</div>
                  </div>
                  <div className="p-4 rounded-lg bg-card border border-border">
                    <div className="text-2xl font-bold">{auditStatsQuery.data.pending}</div>
                    <div className="text-sm text-muted-foreground">Pendentes</div>
                  </div>
                  <div className="p-4 rounded-lg bg-card border border-border">
                    <div className="text-2xl font-bold">{auditStatsQuery.data.inProgress}</div>
                    <div className="text-sm text-muted-foreground">Em Progresso</div>
                  </div>
                  <div className="p-4 rounded-lg bg-card border border-border">
                    <div className="text-2xl font-bold text-green-500">{auditStatsQuery.data.completed}</div>
                    <div className="text-sm text-muted-foreground">Completas</div>
                  </div>
                  <div className="p-4 rounded-lg bg-card border border-border">
                    <div className="text-2xl font-bold">{auditStatsQuery.data.completionRate}%</div>
                    <div className="text-sm text-muted-foreground">Taxa Conclusão</div>
                  </div>
                </div>
              )}

              {/* Filters */}
              <div className="flex gap-4 flex-col md:flex-row">
                <Input
                  placeholder="Buscar por nome, email ou empresa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filtrar por status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="in_progress">Em Progresso</SelectItem>
                    <SelectItem value="completed">Completa</SelectItem>
                    <SelectItem value="cancelled">Cancelada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full">
                  <thead className="bg-card/50 border-b border-border">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Nome</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Empresa</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Site</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAudits.map((audit) => (
                      <tr key={audit.id} className="border-b border-border hover:bg-card/30 transition-colors">
                        <td className="px-6 py-4 text-sm">{audit.name}</td>
                        <td className="px-6 py-4 text-sm">{audit.company}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{audit.email}</td>
                        <td className="px-6 py-4 text-sm">
                          {audit.website ? (
                            <a href={audit.website} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                              Ver
                            </a>
                          ) : (
                            '-'
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <Select value={audit.status || 'pending'} onValueChange={(status) => handleUpdateAuditStatus(audit.id, status)}>
                            <SelectTrigger className="w-40">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pendente</SelectItem>
                              <SelectItem value="in_progress">Em Progresso</SelectItem>
                              <SelectItem value="completed">Completa</SelectItem>
                              <SelectItem value="cancelled">Cancelada</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <button
                            onClick={() => handleDeleteAudit(audit.id)}
                            className="text-red-500 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
