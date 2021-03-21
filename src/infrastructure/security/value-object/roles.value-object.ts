export class RolesValueObject {
  public static availableUserRoles: string[] = [
    'SUPER_ADMIN',
    'ADMIN',
    'USER'
  ]

  public static isValidRole(role: string): boolean {
    const index: number = this.availableUserRoles.findIndex((availableRole: string) => availableRole === role);
    return !!index;
  }
}
