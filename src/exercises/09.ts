interface BlogPost {
    id: number
    title: string
    content: string
    authorId: number
    tags: string[]
    publishedAt: string
    updatedAt: string
    isDraft: boolean
  }

  /**
   * CreatePostReq — 创建文章时前端提交的数据，id / publishedAt / updatedAt 由后端生成，不需要传
     PostListItem — 列表页只展示 id / title / authorId / publishedAt / isDraft
     UpdatePostReq — 编辑文章，id 必传用于定位，其余字段按需传
   */

type CreatePostReq = Omit<BlogPost,'id' | 'publishedAt' | 'updatedAt'>;
type PostListItem = Pick<BlogPost,'id' | 'title' | 'authorId' | 'publishedAt' | 'isDraft'>
type UpdatePostReq = Partial<BlogPost> & Pick<BlogPost,'id'>


// 权限操作只有这四种
type Action = 'read' | 'create' | 'update' | 'delete'

// 路由名称是字符串
// 每个路由对应的权限是 Action 的子集（不一定全有）

type RoutePermissions = Record<string,Action[]>

function hasPermission(
    permissions: RoutePermissions,
    route: string,
    action: Action
  ): boolean{
    return true;
  }


  interface FormField {
    label: string
    type: 'text' | 'number' | 'select' | 'checkbox'
    required: boolean
    defaultValue: string | number | boolean
    options?: string[]   // 仅 select 类型需要
  }

  type FormConfig = Record<string,FormField>;

  function makeReadonlyForm(config: FormConfig): Record<string, Readonly<FormField>> {
    // 实现留空
    return config as Record<string, Readonly<FormField>>
  }