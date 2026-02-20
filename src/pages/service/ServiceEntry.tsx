// 기존 src/App.tsx

import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Suspense, lazy, useState, useEffect } from 'react'
import { Login } from './pages/auth/Login'
import { Register } from './pages/auth/Register'
import { Profile } from './pages/auth/Profile'
import { ForgotPassword } from './pages/auth/ForgotPassword'
import { ProjectsList } from './pages/project/ProjectsList'
import { ProjectDashboard } from './pages/project/ProjectDashboard'
import { ProjectEdit } from './pages/project/ProjectEdit'
import { ProjectMembers } from './pages/project/ProjectMembers'
import { ProjectQuantities } from './pages/project/ProjectQuantities'
import { ProjectRevisions } from './pages/project/ProjectRevisions'
import { OptimizationFlow } from './pages/optimization/OptimizationFlow'
import { BimViewer } from './pages/optimization/BimViewer'
import { OptimizationProgress } from './pages/optimization/OptimizationProgress'
import { ClashDetection } from './pages/optimization/ClashDetection'
import { ResultsOverview } from './pages/optimization/ResultsOverview'
import { ReviewIssues } from './pages/optimization/ReviewIssues'
import { ReinforcementOptimizationResults } from './pages/optimization/ReinforcementOptimizationResults'
import { SpecialLengthPlan } from './pages/optimization/SpecialLengthPlan'
import { CuttingPattern } from './pages/optimization/CuttingPattern'
import { CO2RCWCost } from './pages/optimization/CO2RCWCost'
import { RebarInfo } from './pages/management/RebarInfo'
import { DataManagement } from './pages/management/DataManagement'
import { DesignDocs } from './pages/management/DesignDocs'
import { DesignForces } from './pages/management/DesignForces'
import { SectionMaterial } from './pages/management/SectionMaterial'
import { LoadCases } from './pages/management/LoadCases'
import { UnitCosts } from './pages/management/UnitCosts'
import { IdMapping } from './pages/management/IdMapping'
import { StandardsCodes } from './pages/management/StandardsCodes'
import { AuditLogs } from './pages/management/AuditLogs'
import { StructureInfo } from './pages/structure/StructureInfo'
import { ClashReview } from './pages/structure/ClashReview'
import { StandardsSpecifications } from './pages/bim/StandardsSpecifications'
import { DetailDrawings } from './pages/output/DetailDrawings'
import { ConstructionDrawings } from './pages/output/ConstructionDrawings'
import { BBS } from './pages/output/BBS'
import { BCL } from './pages/output/BCL'
import { Specification } from './pages/output/Specification'
import { UserManagement } from './pages/users/UserManagement'
import { Feedback } from './pages/feedback/Feedback'
import { DesignDocuments } from './pages/design/DesignDocuments'
import { StructureDesignDocument } from './pages/design/StructureDesignDocument'
import { QuantityInfo } from './pages/design/QuantityInfo'
import { Members } from './pages/design/Members'
import { Revisions } from './pages/design/Revisions'
import { SCMManagement } from './pages/scm/SCMManagement'
import { FrameProcessPlan } from './pages/scm/FrameProcessPlan'
import { RebarOrderPlan } from './pages/scm/RebarOrderPlan'
import { ProcessingDeliveryStatus } from './pages/scm/ProcessingDeliveryStatus'
import { InstallationProgress } from './pages/scm/InstallationProgress'
import { SiteRequest } from './pages/collaboration/SiteRequest'
import { IssueDiscussion } from './pages/collaboration/IssueDiscussion'
import { RevisionApproval } from './pages/collaboration/RevisionApproval'
import { Support } from './pages/support/Support'
import { Tutorial } from './pages/support/Tutorial'
import { CaseStudies } from './pages/support/CaseStudies'
import { FAQ } from './pages/support/FAQ'

import AuthLayout from './layouts/AuthLayout'
import AppLayout from './layouts/AppLayout'

// Lazy load ProjectSchedule to prevent Gantt chart from blocking initial render
const ProjectSchedule = lazy(() =>
  import('./pages/project/ProjectSchedule').then((module) => ({
    default: module.ProjectSchedule,
  }))
)

// Simple version for testing
// const ProjectSchedule = lazy(() => import('./pages/project/ProjectScheduleSimple').then(module => ({ default: module.ProjectScheduleSimple })));

function AppContent() {
  const location = useLocation()
  // 초기 화면 크기 확인
  const getInitialIsMobile = () => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < 1024
  }

  // 모바일에서는 기본적으로 접혀있고, 데스크톱에서는 기본적으로 펼쳐져 있음
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(
    getInitialIsMobile()
  )
  const [isMobile, setIsMobile] = useState(getInitialIsMobile())

  // 화면 크기 감지 - 모바일로 전환되면 사이드바를 접음
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (mobile) {
        setIsSidebarCollapsed(true)
      } else if (!mobile && isSidebarCollapsed && isMobile) {
        // 데스크톱으로 전환되면 사이드바를 펼침
        setIsSidebarCollapsed(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isSidebarCollapsed, isMobile])

  // 인증 페이지에서는 사이드바 숨김
  const isAuthPage =
    location.pathname.startsWith('/auth/') || location.pathname === '/'
  const showSidebar = !isAuthPage

  return (
    <>
      <Routes>
        {/* MEMO: 인증 페이지 */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/profile" element={<Profile />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* MEMO: 서비스 페이지 */}
        {/* Projects */}
        <Route element={<AppLayout />}>
          <Route path="/projects" element={<ProjectsList />} />
          <Route
            path="/projects/:id/dashboard"
            element={<ProjectDashboard />}
          />
          <Route path="/projects/:id/edit" element={<ProjectEdit />} />
          <Route path="/projects/:id/members" element={<ProjectMembers />} />
          <Route
            path="/projects/:id/quantities"
            element={<ProjectQuantities />}
          />
          <Route
            path="/projects/:id/revisions"
            element={<ProjectRevisions />}
          />
          <Route path="/projects/:id/schedule" element={<ProjectSchedule />} />
          {/* Structure */}
          <Route path="/structure" element={<StructureInfo />} />
          <Route path="/structure/design" element={<DesignDocuments />} />
          {/* Design */}
          <Route
            path="/design/structure-document"
            element={<StructureDesignDocument />}
          />
          <Route path="/design/members" element={<Members />} />
          <Route path="/design/revisions" element={<Revisions />} />
          <Route path="/design/quantity-info" element={<QuantityInfo />} />
          {/* BIM */}
          <Route path="/bim" element={<BimViewer />} />
          <Route path="/bim/clash" element={<ClashReview />} />
          <Route path="/bim/standards" element={<StandardsSpecifications />} />
          {/* Optimization */}
          <Route path="/opt" element={<OptimizationFlow />} />
          <Route
            path="/opt/reinforcement-results"
            element={<ReinforcementOptimizationResults />}
          />
          <Route path="/opt/special-length" element={<SpecialLengthPlan />} />
          <Route path="/opt/cutting-pattern" element={<CuttingPattern />} />
          <Route path="/opt/co2-rcw-cost" element={<CO2RCWCost />} />
          <Route path="/opt/bim" element={<BimViewer />} />
          <Route path="/opt/progress" element={<OptimizationProgress />} />
          <Route path="/opt/clash" element={<ClashDetection />} />
          <Route path="/opt/results" element={<ResultsOverview />} />
          <Route path="/opt/review" element={<ReviewIssues />} />
          {/* Output */}
          <Route path="/output/detail-drawings" element={<DetailDrawings />} />
          <Route
            path="/output/construction-drawings"
            element={<ConstructionDrawings />}
          />
          <Route path="/output/bbs" element={<BBS />} />
          <Route path="/output/bcl" element={<BCL />} />
          <Route path="/output/specification" element={<Specification />} />
          {/* Management */}
          <Route path="/mgmt/repository" element={<DataManagement />} />
          <Route path="/mgmt/rebar" element={<RebarInfo />} />
          <Route path="/mgmt/docs" element={<DesignDocs />} />
          <Route path="/mgmt/forces" element={<DesignForces />} />
          <Route path="/mgmt/sections" element={<SectionMaterial />} />
          <Route path="/mgmt/loadcases" element={<LoadCases />} />
          <Route path="/mgmt/costs" element={<UnitCosts />} />
          <Route path="/mgmt/id-mapping" element={<IdMapping />} />
          <Route path="/mgmt/standards" element={<StandardsCodes />} />
          <Route path="/mgmt/audit" element={<AuditLogs />} />
          {/* Users */}
          <Route path="/users" element={<UserManagement />} />
          {/* Feedback */}
          <Route path="/feedback" element={<Feedback />} />
          {/* Design */}
          <Route path="/design" element={<DesignDocuments />} />
          {/* SCM */}
          <Route path="/scm" element={<SCMManagement />} />
          <Route path="/scm/frame-process" element={<FrameProcessPlan />} />
          <Route path="/scm/rebar-order" element={<RebarOrderPlan />} />
          <Route
            path="/scm/processing-delivery"
            element={<ProcessingDeliveryStatus />}
          />
          <Route
            path="/scm/installation-progress"
            element={<InstallationProgress />}
          />
          {/* Collaboration */}
          <Route path="/collaboration/site-request" element={<SiteRequest />} />
          <Route
            path="/collaboration/issue-discussion"
            element={<IssueDiscussion />}
          />
          <Route
            path="/collaboration/revision-approval"
            element={<RevisionApproval />}
          />
          {/* Support */}
          <Route path="/support" element={<Support />} />
          <Route path="/support/tutorial" element={<Tutorial />} />
          <Route path="/support/case-studies" element={<CaseStudies />} />
          <Route path="/support/faq" element={<FAQ />} />
        </Route>
      </Routes>
    </>
  )
}

export default function ServiceEntry() {
  return (
    // <BrowserRouter>
    <AppContent />
    // </BrowserRouter>
  )
}
