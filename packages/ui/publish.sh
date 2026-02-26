#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PACKAGE_JSON="${SCRIPT_DIR}/package.json"
ORIGINAL_NAME='@repo/ui'
PUBLISH_NAME='mantine-datatable-extended'

PUBLISH_SUCCESS=0

restore_on_exit() {
  if [[ -f "$PACKAGE_JSON" ]]; then
    if [[ "$PUBLISH_SUCCESS" -eq 1 ]]; then
      # Publish thành công: chỉ khôi phục name, giữ version mới
      sed -i.bak "s|\"name\": *\"${PUBLISH_NAME}\"|\"name\": \"${ORIGINAL_NAME}\"|" "$PACKAGE_JSON"
      rm -f "${PACKAGE_JSON}.bak"
      echo "✓ Đã đổi lại name thành ${ORIGINAL_NAME} (version ${NEW_VERSION})"
    else
      # Publish lỗi: khôi phục cả name và version
      sed -i.bak "s|\"name\": *\"${PUBLISH_NAME}\"|\"name\": \"${ORIGINAL_NAME}\"|" "$PACKAGE_JSON"
      sed -i.bak "s|\"version\": *\"${NEW_VERSION}\"|\"version\": \"${CURRENT_VERSION}\"|" "$PACKAGE_JSON"
      rm -f "${PACKAGE_JSON}.bak"
      echo "✓ Đã khôi phục name thành ${ORIGINAL_NAME} và version thành ${CURRENT_VERSION}"
    fi
  fi
}

trap restore_on_exit EXIT

cd "$SCRIPT_DIR"

CURRENT_VERSION=$(node -p "require('./package.json').version")
echo "Version hiện tại: ${CURRENT_VERSION}"
echo -n "Nhập version mới cho bản publish: "
read -r NEW_VERSION
[[ -z "$NEW_VERSION" ]] && { echo "Version không được để trống."; exit 1; }

echo "→ Đổi name thành ${PUBLISH_NAME} và version thành ${NEW_VERSION}..."
sed -i.bak "s|\"name\": *\"${ORIGINAL_NAME}\"|\"name\": \"${PUBLISH_NAME}\"|" "$PACKAGE_JSON"
sed -i.bak "s|\"version\": *\"${CURRENT_VERSION}\"|\"version\": \"${NEW_VERSION}\"|" "$PACKAGE_JSON"
rm -f "${PACKAGE_JSON}.bak"

echo "→ Building..."
pnpm build

echo "→ Publishing..."
pnpm publish "$@"
PUBLISH_SUCCESS=1

echo ""
echo "✓ Build và publish hoàn tất!"
echo "✓ Name đã được đổi lại thành ${ORIGINAL_NAME}, version ${NEW_VERSION}"
